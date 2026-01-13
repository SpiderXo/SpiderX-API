import jwt from "jsonwebtoken";
import { users } from "../users.js";

const SECRET = "SPIDERX_SECRET";

export default function handler(req, res) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token" });

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = users.find(u => u.id === decoded.id);

    // 🚦 Rate Limit
    if (user.plan === "free" && user.requests >= 100) {
      return res.status(429).json({ error: "Free limit reached" });
    }

    // ➕ عدّاد الطلبات
    user.requests++;

    res.json({
      message: "Protected data",
      requests: user.requests
    });

  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
