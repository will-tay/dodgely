import { pgTable, bigserial, text, timestamp, bigint, inet } from 'drizzle-orm/pg-core'
// export const users = pgTable("users", { id: serial("id").primaryKey() });
export const links = pgTable("links", {
  id: bigserial("id", {mode: 'number'}).primaryKey(),
  slug: text("slug").notNull().unique(),
  target_url: text("target_url").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  click_count: bigint("click_count", {mode: 'number'}).default(0).notNull(),
  creator_ip: inet("creator_ip")
});

export {};
