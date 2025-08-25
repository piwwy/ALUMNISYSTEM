import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool.js";

const router = Router();

// POST /api/auth/login { username, password }
router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: "username and password required" });

  const [rows] = await pool.query(
    "SELECT id, username, password, email, role FROM users WHERE username = ? LIMIT 1",
    [username]
  );
  const user = rows[0];
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password).catch(() => false);

  // If your seed used plaintext, this fallback lets you log in once.
  const plaintextMatch = user.password && user.password === password;

  if (!isMatch && !plaintextMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // If plaintext matched, encourage migrating to bcrypt soon.
  const token = jwt.sign(
    { id: user.id, role: user.role, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  res.json({
    token,
    user: { id: user.id, username: user.username, email: user.email, role: user.role }
  });
});

export default router;
