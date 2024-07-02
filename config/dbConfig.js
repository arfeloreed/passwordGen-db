import pg from "pg";
import "dotenv/config";

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function connectDB() {
  try {
    await db.connect();
  } catch (err) {
    console.error("Error connecting to database: ", err.message);
    process.exit(1);
  }
}

async function disconnectDB() {
  try {
    await db.end();
  } catch (err) {
    console.error("Failed to disconnect from database: ", err.message);
  }
}

export { db, connectDB, disconnectDB };
