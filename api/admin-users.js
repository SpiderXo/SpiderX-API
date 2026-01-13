import jwt from "jsonwebtoken";
import { users } from "../users.js";

const SECRET = "SPIDERX_SECRET";

export default function handler(req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    const admin = users.find(u => u.id === decoded.id);

    if (admin.role !== "admin")
      return res.status(403).json({ error: "Not admin" });

    res.json(users);
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
