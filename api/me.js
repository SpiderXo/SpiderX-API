import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({
      username: decoded.username,
      role: "admin",
      platform: "SpiderX"
    });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
