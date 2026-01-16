import { users } from "../../core/db.js";
import { createToken } from "../../core/auth.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = createToken(user);

  return res.json({
    token,
    apiKey: user.apiKey
  });
}
