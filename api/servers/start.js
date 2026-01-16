import { verify } from "../../core/auth.js";
import { getServer } from "../../core/servers.js";

export default function handler(req, res) {
  const user = verify(req);
  if (!user) return res.status(401).end();

  const { id } = req.body;
  const server = getServer(id);
  if (!server) return res.status(404).end();

  server.status = "running";
  server.logs.push("Server started");

  res.json({ status: "running" });
}
