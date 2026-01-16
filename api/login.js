import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const USER = {
  username: "SpiderXDev",
  passwordHash: bcrypt.hashSync("spiderxishere7", 10)
};

const JWT_SECRET = "SPIDERX_SECRET_KEY";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username, password } = req.body || {};

  if (
    username !== USER.username ||
    !bcrypt.compareSync(password, USER.passwordHash)
  ) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token
  });
}
