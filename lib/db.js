import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const db = await open({
  filename: "./database.db",
  driver: sqlite3.Database
});

// جدول المستخدمين
await db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  apiKey TEXT UNIQUE,
  plan TEXT DEFAULT 'free',
  requests INTEGER DEFAULT 0
);
`);

// جدول تسجيل الطلبات
await db.exec(`
CREATE TABLE IF NOT EXISTS requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  endpoint TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);
