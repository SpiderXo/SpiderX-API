import jwt from "jsonwebtoken";
import { db } from "../database/db.js";

const SECRET = "SPIDERX_SECRET";

export default async function handler(req, res) {
  const { username, password } = req.body;

  const user = await db.get(
    "SELECT * FROM users WHERE username = ?",
    username
  );

  if (!user || password !== "123456")
    return res.status(401).json({ error: "Invalid" });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
}
