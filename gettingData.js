import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "shaikaaron",
  password: process.env.DB_PASSWORD,
  database: "users_database",
});

const connection = pool.promise();

const app = express();
const port = 3001;

app.use(cors());

app.get("/api/data", async (req, res) => {
  try {
    const [rows, fields] = await connection.query("SELECT * FROM USERS");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
