const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Alumni Management API is running 🚀');
});

// Alumni route (example)
const pool = require('./db');
app.get('/api/alumni', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alumni');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3307;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
