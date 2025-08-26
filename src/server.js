import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import alumniRoute from "./routes/alumni.js";
import { pool } from "./db/pool.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Basic health check
app.get("/health", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ ok: true, db: rows[0].ok === 1 });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/alumni", alumniRoute);

// 404
app.use((req, res) => res.status(404).json({ message: "Not found" }));

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
