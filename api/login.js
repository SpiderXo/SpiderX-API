export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  // Demo user (مؤقت)
  if (username === "SpiderX" && password === "123456") {
    return res.json({
      token: "FAKE-JWT-TOKEN",
      apiKey: "SPIDERX-KEY-123456",
      username: "SpiderX",
      plan: "free",
      requests: 0
    });
  }

  return res.status(401).json({ error: "Invalid credentials" });
}
