import express from "express";
import { eq, sql } from "drizzle-orm";
import { db } from "./db/index.js";
import { generateSlug } from "./slug.js";
import { validateUrl } from './utils.js';
import { links } from "./db/schema.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  console.log(generateSlug());
  res.json({ message: "Hello from dodgely" });
});


app.post("/api/links", async (req, res) => {
  const url = req.body.url;
  const error = validateUrl(url, req.host);
  if (error) return res.status(400).json({ error });

  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = generateSlug();
    try {
      await db.insert(links).values({
        target_url: url,
        slug,
        creator_ip: req.ip
      }).returning();
      return res.status(201).json({ url: `http://localhost:${port}/${slug}` });
    } catch (err) {
      if ((err as any).cause?.code === "23505") continue;
      throw err
    }
  }
  return res.status(500).json({ error: 'Failed to generate unique slug' });
});

app.get("/health/db", async (_req, res) => {
  try {
    await db.execute(sql`select 1`);
    res.json({ ok: true });
  } catch (err) {
    res.status(503).json({ ok: false, error: (err as Error).message });
  }
});

app.get("/:slug", async (req, res) => {
  const slug = req.params.slug;
  const newLink = await db.update(links)
    .set({ click_count: sql`${links.click_count} + 1` })
    .where(eq(links.slug, slug))
    .returning({ target: links.target_url })
  if (newLink.length < 1) return res.status(404).json({ error: 'No link with that slug exists' })
  return res.redirect(302, newLink[0].target);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
