import { Router } from "express";
import { pool } from "../db/pool.js";
import { authenticate, allowRoles } from "../middleware/auth.js";

const router = Router();

// List alumni (any logged-in role)
router.get("/", authenticate, async (req, res) => {
  const { q, year, page = 1, pageSize = 20 } = req.query;
  const offset = (Number(page) - 1) * Number(pageSize);

  const filters = [];
  const params = [];

  if (q) {
    filters.push("(first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)");
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  if (year) {
    filters.push("graduation_year = ?");
    params.push(year);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const sql = `
    SELECT id, first_name, last_name, email, graduation_year, major, current_occupation, current_company, current_location
    FROM alumni
    ${where}
    ORDER BY last_name, first_name
    LIMIT ? OFFSET ?`;

  const countSql = `SELECT COUNT(*) AS total FROM alumni ${where}`;

  const [countRows] = await pool.query(countSql, params);
  const total = countRows[0]?.total || 0;

  const [rows] = await pool.query(sql, [...params, Number(pageSize), offset]);
  res.json({ data: rows, page: Number(page), pageSize: Number(pageSize), total });
});

// Create alumni (Registrar, Admin, Super Admin)
router.post("/", authenticate, allowRoles("Registrar", "Admin", "Super Admin"), async (req, res) => {
  const {
    user_id = null,
    first_name, last_name, email, phone = null,
    graduation_year = null, major = null,
    current_occupation = null, current_company = null, current_location = null,
    linkedin_profile = null, bio = null, profile_picture_url = null
  } = req.body || {};

  if (!first_name || !last_name) {
    return res.status(400).json({ message: "first_name and last_name are required" });
  }

  const [result] = await pool.query(
    `INSERT INTO alumni
     (user_id, first_name, last_name, email, phone, graduation_year, major, current_occupation,
      current_company, current_location, linkedin_profile, bio, profile_picture_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_id, first_name, last_name, email, phone, graduation_year, major, current_occupation,
     current_company, current_location, linkedin_profile, bio, profile_picture_url]
  );

  res.status(201).json({ id: result.insertId });
});

// Update alumni (Registrar, Admin, Super Admin) or the alumnus updating their own profile
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  // If the user is an Alumni, allow only self-update (match by email or a future alumni.user_id link)
  if (req.user.role === "Alumni") {
    // Simplest check: ensure this alumni row belongs to the logged-in user via email match
    const [rows] = await pool.query("SELECT email FROM alumni WHERE id = ?", [id]);
    const row = rows[0];
    if (!row) return res.status(404).json({ message: "Not found" });

    // You may store user email in token or join by users table; token has username only by default.
    // If your username is the same as email, this works; if not, adjust to fetch user’s email first.
    if (req.user.username !== row.email) {
      return res.status(403).json({ message: "You can only update your own profile" });
    }
  } else if (!["Registrar", "Admin", "Super Admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const fields = [
    "first_name","last_name","email","phone","graduation_year","major",
    "current_occupation","current_company","current_location","linkedin_profile","bio","profile_picture_url"
  ];

  const sets = [];
  const vals = [];
  for (const f of fields) {
    if (f in req.body) { sets.push(`${f} = ?`); vals.push(req.body[f]); }
  }
  if (!sets.length) return res.status(400).json({ message: "No changes submitted" });

  vals.push(id);

  await pool.query(`UPDATE alumni SET ${sets.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, vals);
  res.json({ message: "Updated" });
});

// Delete alumni (Admin, Super Admin)
router.delete("/:id", authenticate, allowRoles("Admin", "Super Admin"), async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM alumni WHERE id = ?", [id]);
  res.json({ message: "Deleted" });
});

export default router;
