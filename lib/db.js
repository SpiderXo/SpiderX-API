import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const db = await open({
  filename: "./data.db",
  driver: sqlite3.Database
});

await db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  username TEXT,
  apiKey TEXT,
  plan TEXT DEFAULT 'free',
  requests INTEGER DEFAULT 0
);
`);
