import { verify } from "../../core/auth.js";
import { createServer } from "../../core/servers.js";

export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).end();

  const user = verify(req);
  if (!user) return res.status(401).end();

  const { name } = req.body;
  if (!name) return res.status(400).end();

  const server = createServer(name, user.username);
  res.json(server);
}
