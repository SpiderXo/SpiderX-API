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

    res.json({
      username: user.username,
      plan: user.plan,
      requests: user.requests,
      apiKey: user.apiKey
    });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
