import jwt from "jsonwebtoken";
import { users } from "../users.js";

const SECRET = "SPIDERX_SECRET";

export default function handler(req, res) {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid login" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    apiKey: user.apiKey
  });
}
