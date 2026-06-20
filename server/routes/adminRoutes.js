const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { validateAdminCredentials, signJWT } = require('../services/authService');
const {
  getAllParticipantsWithResponses,
  deleteParticipantAndResponses,
} = require('../services/databaseService');

// POST /api/admin/login – public
router.post('/login', (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    if (!validateAdminCredentials(email, password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = signJWT({ email });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

// All routes below require authentication
router.use(authMiddleware);

// GET /api/admin/responses
router.get('/responses', async (req, res, next) => {
  try {
    const data = await getAllParticipantsWithResponses();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/responses/:id
router.delete('/responses/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Participant ID required' });
    }
    const deleted = await deleteParticipantAndResponses(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Participant not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Response deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;