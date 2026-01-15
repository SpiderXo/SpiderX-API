import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../core/db.js";
import { SECRET } from "../../core/auth.js";

export function login(req, res) {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, user) => {
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user.id }, SECRET);
      res.json({ token, apiKey: user.apiKey });
    }
  );
}
