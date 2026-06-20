import apiClient from './api.js';
import {
  questions,
  surveyAnswers,
  resetSurveyState,
  setSurveyDomRefs,
  renderQuestion,
  surveyNext,
  surveyBack,
  renderReview,
} from './survey.js';
import {
  adminLogin,
  adminLogout,
  renderAdminDashboard,
  viewResponse,
  deleteResponse,
  exportCSV,
} from './admin.js';
import { getToken, removeToken } from './utils.js';

// ============================================================
//  GLOBALS
// ============================================================
let participantData = {};

// ============================================================
//  DOM REFS
// ============================================================
const $ = (id) => document.getElementById(id);
const pageWelcome = $('page-welcome');
const pageRegister = $('page-register');
const pageSurvey = $('page-survey');
const pageReview = $('page-review');
const pageThankyou = $('page-thankyou');
const pageAdminLogin = $('page-admin-login');
const pageAdminDashboard = $('page-admin-dashboard');

// Expose admin functions to global scope for inline onclick
window.viewResponse = viewResponse;
window.deleteResponse = deleteResponse;
window.exportCSV = exportCSV;

// ============================================================
//  NAVIGATION
// ============================================================
function goToPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    target.style.animation = 'none';
    requestAnimationFrame(() => {
      target.style.animation = 'fadeSlideUp 0.5s ease forwards';
    });
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
//  REGISTER
// ============================================================
async function registerParticipant(e) {
  e.preventDefault();
  const fullName = $('reg-fullname').value.trim();
  const department = $('reg-department').value.trim();
  const studyYear = $('reg-year').value.trim();
  const gender = $('reg-gender').value;
  const age = $('reg-age').value.trim();

  if (!fullName || !department || !studyYear || !gender || !age) {
    alert('الرجاء تعبئة جميع الحقول المطلوبة. / Please fill all required fields.');
    return;
  }

  try {
    const response = await apiClient.post('/register', {
      fullName, department, studyYear, gender, age
    });

    participantData = { fullName, department, studyYear, gender, age, id: response.id };
    window._participantData = participantData; // for review

    // Reset survey state
    resetSurveyState();

    goToPage('page-survey');
    renderQuestion(goToPage, renderReview);
  } catch (error) {
    alert('Registration failed: ' + error.message);
  }
}

// ============================================================
//  SUBMIT SURVEY
// ============================================================
async function submitSurvey() {
  if (!participantData.id) {
    alert('Participant ID missing. Please re-register.');
    return;
  }

  try {
    await apiClient.post('/survey/submit', {
      participantId: participantData.id,
      answers: surveyAnswers
    });
    goToPage('page-thankyou');
  } catch (error) {
    alert('Submission failed: ' + error.message);
  }
}

// ============================================================
//  RESET SURVEY
// ============================================================
function resetSurvey() {
  participantData = {};
  window._participantData = {};
  // Clear form
  ['reg-fullname', 'reg-department', 'reg-year', 'reg-age'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const genderSelect = document.getElementById('reg-gender');
  if (genderSelect) genderSelect.value = '';
  goToPage('page-welcome');
}

// ============================================================
//  ADMIN LOGIN (UI)
// ============================================================
async function handleAdminLogin(e) {
  e.preventDefault();
  const email = $('admin-username').value.trim();
  const password = $('admin-password').value.trim();

  try {
    await adminLogin(email, password);
    goToPage('page-admin-dashboard');
    await renderAdminDashboard();
  } catch (error) {
    const errEl = $('admin-login-error');
    errEl.textContent = '❌ ' + error.message;
    errEl.style.display = 'block';
  }
}

function showAdminLogin() {
  goToPage('page-admin-login');
  $('admin-login-error').style.display = 'none';
}

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Set survey DOM refs
  setSurveyDomRefs({
    questionContainer: $('questionContainer'),
    surveyProgress: $('surveyProgress'),
    surveyStepLabel: $('surveyStepLabel'),
    surveyStepEn: $('surveyStepEn'),
    surveyBackBtn: $('surveyBackBtn'),
    surveyNextBtn: $('surveyNextBtn'),
    reviewContainer: $('reviewContainer'),
  });

  // Registration form
  document.getElementById('registerForm').addEventListener('submit', registerParticipant);

  // Admin login form
  document.getElementById('admin-login-form').addEventListener('submit', handleAdminLogin);

  // Admin logout button
  document.getElementById('adminLogoutBtn')?.addEventListener('click', () => {
    adminLogout();
    goToPage('page-welcome');
  });

  // Survey navigation buttons
  document.getElementById('surveyNextBtn').addEventListener('click', () => surveyNext(goToPage, renderReview));
  document.getElementById('surveyBackBtn').addEventListener('click', () => surveyBack(goToPage, renderReview));

  // Submit survey button (in review page)
  document.getElementById('submitSurveyBtn')?.addEventListener('click', submitSurvey);

  // Reset button (thank you)
  document.getElementById('resetSurveyBtn')?.addEventListener('click', resetSurvey);

  // Admin link
  document.getElementById('adminLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    showAdminLogin();
  });

  // Modal close
  document.getElementById('responseModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('open');
    }
  });

  // Close modal button
  document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('responseModal').classList.remove('open');
  });

  // Admin search
  document.getElementById('adminSearch')?.addEventListener('input', () => {
    if (document.getElementById('page-admin-dashboard').classList.contains('active')) {
      renderAdminDashboard();
    }
  });

  // Check if already logged in and on dashboard
  if (getToken() && document.getElementById('page-admin-dashboard').classList.contains('active')) {
    renderAdminDashboard();
  }

  console.log('🧪 Cosmetovigilance 2.0 app initialized.');
});