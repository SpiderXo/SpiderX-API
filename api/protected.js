import { USERS } from "../keys.js";

export default function handler(req, res) {
  const key = req.headers["x-api-key"];
  const user = USERS.find(u => u.apiKey === key);

  if (!user) {
    return res.status(401).json({ error: "Invalid API Key" });
  }

  const now = Date.now();

  // Rate limit: 5 requests / minute
  if (now - user.lastRequest < 60000 && user.requests >= 5) {
    return res.status(429).json({
      error: "Rate limit exceeded"
    });
  }

  if (now - user.lastRequest > 60000) {
    user.requests = 0;
    user.lastRequest = now;
  }

  user.requests++;

  res.json({
    message: "Access granted 🕸",
    user: user.username
  });
}
