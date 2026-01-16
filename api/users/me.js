import { verifyToken } from "../../core/auth.js";
import { users } from "../../core/db.js";

export default function handler(req, res) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ error: "No token" });
  }

  const token = auth.split(" ")[1];
  const data = verifyToken(token);

  if (!data) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const user = users.find(u => u.id === data.id);

  return res.json({
    username: user.username,
    apiKey: user.apiKey,
    plan: user.plan,
    requests: user.requests
  });
}
