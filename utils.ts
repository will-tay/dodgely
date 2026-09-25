export const validateUrl = (url: string, ownHost: string) => {
  if (typeof url !== "string") return "Error: URL must be a string";
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return "Error: Invalid URL";
  }
  if (!parsedUrl.protocol || (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:")) return "Error: Invalid protocol";
  if (parsedUrl.host === ownHost) return "Error: URL cannot point to own host";
  return null;
}