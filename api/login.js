export default function handler(req, res) {
  const { username, password } = req.body;

  if (username === "spiderx" && password === "123456") {
    return res.json({
      apiKey: "SPIDERX-KEY-123"
    });
  }

  res.status(401).json({ error: "Invalid login" });
}
