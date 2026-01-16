import jwt from "jsonwebtoken";

export function sign(user) {
  return jwt.sign(
    { username: user.username, admin: user.admin },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
}

export function verify(req) {
  const auth = req.headers.authorization;
  if (!auth) return null;

  const token = auth.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}
