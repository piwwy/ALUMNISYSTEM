const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
const alumniRoutes = require('./routes/alumniRoutes');
app.use('/api/alumni', alumniRoutes);

const PORT = process.env.PORT || 3307;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
