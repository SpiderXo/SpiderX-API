import { db } from "../lib/db.js";

export default async function handler(req, res) {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({ error: "API key missing" });
    }

    const user = await db.get(
      "SELECT username, apiKey, plan, requests FROM users WHERE apiKey = ?",
      apiKey
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
