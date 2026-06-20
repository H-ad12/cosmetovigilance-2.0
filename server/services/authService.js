const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const signJWT = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
};

const verifyJWT = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const validateAdminCredentials = (email, password) => {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
};

module.exports = {
  signJWT,
  verifyJWT,
  validateAdminCredentials,
};