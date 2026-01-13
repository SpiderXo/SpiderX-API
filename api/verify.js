import { users } from "../users.js";

export default function handler(req, res) {
  const { username } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) return res.status(404).json({ error: "Not found" });

  user.verified = true;
  res.json({ success: true });
}
