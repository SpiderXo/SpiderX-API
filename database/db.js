import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const db = await open({
  filename: "spiderx.db",
  driver: sqlite3.Database
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    apiKey TEXT,
    requests INTEGER DEFAULT 0
  )
`);
