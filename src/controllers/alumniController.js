const pool = require('../db');

// GET all alumni
exports.getAllAlumni = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alumni');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one alumni
exports.getAlumniById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alumni WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Alumni not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
