import { rateLimit } from "../lib/rateLimit.js";

export default async function handler(req, res) {
  const user = await rateLimit(req, res);
  if (!user) return;

  res.status(200).json({
    status: "online",
    owner: "SpiderX",
    plan: user.plan,
    requests: user.requests + 1
  });
}
