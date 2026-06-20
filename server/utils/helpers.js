const { randomUUID } = require('crypto');

const generateUUID = () => randomUUID();

const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/[<>]/g, '');
};

module.exports = { generateUUID, sanitizeInput };