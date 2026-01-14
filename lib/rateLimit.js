import { db } from "./db.js";

export async function rateLimit(req, res) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    res.status(401).json({ error: "API key required" });
    return null;
  }

  const user = await db.get(
    "SELECT * FROM users WHERE apiKey = ?",
    apiKey
  );

  if (!user) {
    res.status(401).json({ error: "Invalid API key" });
    return null;
  }

  if (user.plan === "free" && user.requests >= 100) {
    res.status(429).json({
      error: "Free plan limit reached (100 requests)"
    });
    return null;
  }

  // ⬅️ زيادة العداد
  await db.run(
    "UPDATE users SET requests = requests + 1 WHERE apiKey = ?",
    apiKey
  );

  // 🧾 تسجيل الطلب
  await db.run(
    "INSERT INTO requests (userId, endpoint) VALUES (?, ?)",
    user.id,
    req.url
  );

  return user;
}
