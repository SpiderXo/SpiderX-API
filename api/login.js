export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (username === "SpiderX" && password === "1234") {
    const token = "TOKEN-" + Date.now();

    return res.json({
      token,
      apiKey: "SPIDERX-KEY-123456"
    });
  }

  res.status(401).json({ error: "Invalid credentials" });
}
