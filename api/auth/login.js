import { getUser } from "../../core/db.js";
import { sign } from "../../core/auth.js";

export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).end();

  const { username, password } = req.body;

  const user = getUser(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid login" });
  }

  const token = sign(user);
  res.json({ token, admin: user.admin });
}
