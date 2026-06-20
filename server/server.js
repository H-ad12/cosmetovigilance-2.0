const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });
console.log('📦 Loaded .env from:', path.resolve(__dirname, '../.env'));
console.log('🔐 Env vars loaded:', {
  JWT_SECRET: Boolean(process.env.JWT_SECRET),
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || null,
  ADMIN_PASSWORD: Boolean(process.env.ADMIN_PASSWORD),
});

const express = require('express');
const cors = require('cors');

const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Routes
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});