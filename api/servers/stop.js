import { verify } from "../../core/auth.js";
import { getServer } from "../../core/servers.js";

export default function handler(req, res) {
  const user = verify(req);
  if (!user) return res.status(401).end();

  const { id } = req.body;
  const server = getServer(id);
  if (!server) return res.status(404).end();

  server.status = "stopped";
  server.logs.push("Server stopped");

  res.json({ status: "stopped" });
}
