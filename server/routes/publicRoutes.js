const express = require('express');
const router = express.Router();
const { addParticipant, addResponse, participantExists } = require('../services/databaseService');
const { sanitizeInput } = require('../utils/helpers');

const sanitizeAnswers = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitizeAnswers);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [sanitizeInput(key), sanitizeAnswers(child)])
    );
  }
  return typeof value === 'string' ? sanitizeInput(value) : value;
};

// POST /api/register
router.post('/register', async (req, res, next) => {
  try {
    const fullName = sanitizeInput(req.body.fullName);
    const department = sanitizeInput(req.body.department);
    const studyYear = sanitizeInput(req.body.studyYear);
    const gender = sanitizeInput(req.body.gender);
    const age = Number(req.body.age);

    const allowedGenders = ['ذكر', 'أنثى'];
    if (!fullName || !department || !studyYear || !gender || !Number.isInteger(age)) {
      return res.status(400).json({ error: 'All fields are required and age must be a whole number' });
    }
    if (!allowedGenders.includes(gender)) {
      return res.status(400).json({ error: 'Gender must be ذكر or أنثى' });
    }
    if (age < 18 || age > 120) {
      return res.status(400).json({ error: 'Age must be between 18 and 120' });
    }

    const participant = await addParticipant({ fullName, department, studyYear, gender, age });
    res.status(201).json({ id: participant.id });
  } catch (error) {
    next(error);
  }
});

// POST /api/survey/submit
router.post('/survey/submit', async (req, res, next) => {
  try {
    const participantId = sanitizeInput(req.body.participantId);
    const answers = req.body.answers;

    if (!participantId || !answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'Missing participantId or answers' });
    }
    if (!(await participantExists(participantId))) {
      return res.status(404).json({ error: 'Participant not found' });
    }

    await addResponse(participantId, sanitizeAnswers(answers));
    res.status(201).json({ message: 'Survey submitted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;