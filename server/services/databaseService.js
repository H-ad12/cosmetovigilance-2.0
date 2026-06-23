const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_PATH = path.join(__dirname, '../database/db.json');

const makeId = () => {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const loadDatabase = () => {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const db = JSON.parse(raw);
    return {
      participants: Array.isArray(db.participants) ? db.participants : [],
      responses: Array.isArray(db.responses) ? db.responses : [],
    };
  } catch (error) {
    const initialDb = { participants: [], responses: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf-8');
    return initialDb;
  }
};

const saveDatabase = (db) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
};

const addParticipant = async (data) => {
  const db = loadDatabase();
  const participant = {
    id: makeId(),
    fullName: data.fullName,
    studyYear: data.studyYear,
    gender: data.gender,
    age: data.age,
    registeredAt: new Date().toISOString(),
  };
  db.participants.push(participant);
  saveDatabase(db);
  return participant;
};

const addResponse = async (participantId, answers) => {
  const db = loadDatabase();
  const response = {
    id: makeId(),
    participantId,
    answers,
    submittedAt: new Date().toISOString(),
  };
  db.responses.push(response);
  saveDatabase(db);
  return response;
};

const participantExists = async (id) => {
  const db = loadDatabase();
  return db.participants.some((participant) => participant.id === id);
};

const getAllParticipantsWithResponses = async () => {
  const db = loadDatabase();
  return db.participants.map((participant) => ({
    id: participant.id,
    fullName: participant.fullName,
    studyYear: participant.studyYear,
    gender: participant.gender,
    age: participant.age,
    registeredAt: participant.registeredAt,
    responses: db.responses
      .filter((response) => response.participantId === participant.id)
      .map((response) => ({
        id: response.id,
        answers: response.answers,
        submittedAt: response.submittedAt,
      })),
  }));
};

const deleteParticipantAndResponses = async (participantId) => {
  const db = loadDatabase();
  const initialCount = db.participants.length;
  db.participants = db.participants.filter((participant) => participant.id !== participantId);
  db.responses = db.responses.filter((response) => response.participantId !== participantId);
  const deleted = db.participants.length !== initialCount;
  if (deleted) {
    saveDatabase(db);
  }
  return deleted;
};

module.exports = {
  addParticipant,
  addResponse,
  participantExists,
  getAllParticipantsWithResponses,
  deleteParticipantAndResponses,
};