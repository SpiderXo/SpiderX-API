import { db } from "../lib/db.js";

export default async function handler(req, res) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await db.get(
    "SELECT * FROM users WHERE apiKey = ?",
    token
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const logs = await db.all(
    "SELECT endpoint, createdAt FROM requests WHERE userId = ? ORDER BY id DESC LIMIT 20",
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
