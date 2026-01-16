import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const USERNAME = process.env.SPIDERX_USERNAME;
const PASSWORD_HASH = bcrypt.hashSync(
  process.env.SPIDERX_PASSWORD,
  10
);

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username, password } = req.body || {};

  if (
    username !== USERNAME ||
    !bcrypt.compareSync(password, PASSWORD_HASH)
  ) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token
  });
}
