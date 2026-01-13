import { rateLimit } from "../lib/rateLimit.js";

export default async function handler(req, res) {
  await new Promise((resolve) => rateLimit(req, res, resolve));
  res.json({ status: "SpiderX API Online" });
}
