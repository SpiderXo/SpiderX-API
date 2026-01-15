import { db } from "../../core/db.js";

export function me(req, res) {
  db.get(
    "SELECT username, apiKey, plan, requests FROM users WHERE id = ?",
    [req.user.id],
    (err, user) => {
      res.json(user);
    }
  );
}
