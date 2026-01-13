import { db } from "./db.js";

export async function rateLimit(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).json({ error: "API key missing" });
  }

  const user = await db.get(
    "SELECT * FROM users WHERE apiKey = ?",
    apiKey
  );

  if (!user) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  if (user.plan === "free" && user.requests >= 100) {
    return res.status(429).json({ error: "Free limit reached" });
  }

  await db.run(
    "UPDATE users SET requests = requests + 1 WHERE apiKey = ?",
    apiKey
  );

  req.user = user;
  next();
}
