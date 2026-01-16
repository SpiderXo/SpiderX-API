import { verify } from "../../core/auth.js";

export default function handler(req, res) {
  const user = verify(req);
  if (!user) return res.status(401).end();

  res.json(user);
}
