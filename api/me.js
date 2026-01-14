import { db } from "../lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = req.headers.authorization;

  if (!apiKey) {
    return res.status(401).json({ error: "Missing API key" });
  }

  const user = await db.get(
    "SELECT * FROM users WHERE apiKey = ?",
    apiKey
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  const logs = await db.all(
    "SELECT endpoint, createdAt FROM requests WHERE userId = ? ORDER BY id DESC LIMIT 10",
    user.id
  );

  res.json({
    username: user.username,
    apiKey: user.apiKey,
    plan: user.plan,
    requests: user.requests,
    logs
  });
}
