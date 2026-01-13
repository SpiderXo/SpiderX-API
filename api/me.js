export default function handler(req, res) {
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== "SPIDERX-KEY-123") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.json({
    username: "spiderx",
    requests: 7
  });
}
