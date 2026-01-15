import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { db } from "./core/db.js";
import { auth } from "./core/auth.js";
import { login } from "./api/auth/login.js";
import { me } from "./api/users/me.js";

const app = express();
app.use(express.json());

// CREATE FIRST ADMIN USER (مرة واحدة)
app.get("/setup", async (req, res) => {
  const password = await bcrypt.hash("admin123", 10);
  const apiKey = crypto.randomBytes(16).toString("hex");

  db.run(
    "INSERT OR IGNORE INTO users (username, password, apiKey, plan) VALUES (?, ?, ?, 'pro')",
    ["SpiderX", password, apiKey]
  );

  res.send("Admin created");
});

// AUTH
app.post("/api/login", login);
app.get("/api/me", auth, me);

app.listen(3000, () => {
  console.log("SpiderX Backend running on http://localhost:3000");
});
