export default function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (username === "SpiderX" && password === "123456") {
    return res.json({
      token: "JWT_FAKE_TOKEN",
      apiKey: "SPIDERX-KEY-123456"
    });
  }

  return res.status(401).json({ error: "Invalid login" });
}
