import jwt from "jsonwebtoken";

const USERS = [
  {
    id: 1,
    username: "SpiderX",
    password: "123456",
    apiKey: "SPIDERX-KEY-123456",
    plan: "free",
    requests: 0
  }
];

const JWT_SECRET = "SPIDERX_SECRET";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  const user = USERS.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    token,
    apiKey: user.apiKey
  });
}
