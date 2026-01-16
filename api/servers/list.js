import { verify } from "../../core/auth.js";
import { getServers } from "../../core/servers.js";

export default function handler(req, res) {
  const user = verify(req);
  if (!user) return res.status(401).end();

  res.json(getServers(user.username));
}
