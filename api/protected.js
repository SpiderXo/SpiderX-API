import { db } from "../database/db.js";

export default async function handler(req, res) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "No API Key" });
  }

  const user = await db.get(
    "SELECT * FROM users WHERE apiKey = ?",
    apiKey
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid API Key" });
  }

  // 🔴 هنا بنسجل الـ Request
  await db.run(
    "UPDATE users SET requests = requests + 1 WHERE apiKey = ?",
    apiKey
  );

  res.json({
    message: "Access granted 🕸",
    user: user.username,
    totalRequests: user.requests + 1
  });
}
