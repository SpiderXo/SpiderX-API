import jwt from "jsonwebtoken";

const JWT_SECRET = "SPIDERX_SECRET_KEY";

export default function handler(req, res) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    res.json({
      username: decoded.username,
      role: "admin",
      platform: "SpiderX"
    });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
