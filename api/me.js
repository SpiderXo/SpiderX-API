export default function handler(req, res) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token" });
  }

  res.json({
    username: "SpiderX",
    apiKey: "SPIDERX-KEY-123456"
  });
}
