import { db } from "../database/db.js";

export default async function handler(req, res) {
  const apiKey = req.headers["x-api-key"];

  const user = await db.get(
    "SELECT username, requests FROM users WHERE apiKey = ?",
    apiKey
  );

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.json(user);
}
