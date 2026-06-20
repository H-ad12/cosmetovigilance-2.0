import apiClient from './api.js';
import { getToken, setToken, removeToken, formatDate } from './utils.js';
import { questions } from './survey.js';

// ============================================================
//  ADMIN LOGIN
// ============================================================
export async function adminLogin(email, password) {
  try {
    const response = await apiClient.post('/admin/login', { email, password });
    setToken(response.token);
    return true;
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
}

export function adminLogout() {
  removeToken();
  window.location.reload(); // simple refresh to reset state
}

// ============================================================
//  DASHBOARD RENDER
// ============================================================
export async function renderAdminDashboard() {
  const token = getToken();
  if (!token) {
    document.getElementById('adminTableBody').innerHTML =
      '<tr><td colspan="7" style="text-align:center; color:var(--text-muted);">الرجاء تسجيل الدخول أولاً.</td></tr>';
    return;
  }

  try {
    const data = await apiClient.get('/admin/responses', token);
    renderStats(data);
    renderTable(data);
  } catch (error) {
    document.getElementById('adminTableBody').innerHTML =
      `<tr><td colspan="7" style="text-align:center; color:var(--accent-rose);">${error.message}</td></tr>`;
  }
}

function renderStats(data) {
  document.getElementById('statTotal').textContent = data.length;
  const completed = data.filter(d => d.responses && d.responses.length > 0).length;
  document.getElementById('statCompleted').textContent = completed;
}

function renderTable(data) {
  const search = document.getElementById('adminSearch').value.trim().toLowerCase();
  const filtered = data.filter(item => {
    const name = (item.fullName || '').toLowerCase();
    const dept = (item.department || '').toLowerCase();
    return name.includes(search) || dept.includes(search);
  });

  const tbody = document.getElementById('adminTableBody');
  const noData = document.getElementById('adminNoData');

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    noData.style.display = 'block';
    return;
  }
  noData.style.display = 'none';

  let html = '';
  filtered.forEach((item, idx) => {
    const completed = item.responses && item.responses.length > 0 ? '✅' : '❌';
    const date = item.registeredAt ? formatDate(item.registeredAt) : '—';
    html += `
      <tr>
        <td>${idx + 1}</td>
        <td>${item.fullName || '—'}</td>
        <td>${item.department || '—'}</td>
        <td>${item.age || '—'}</td>
        <td>${date}</td>
        <td>${completed}</td>
        <td>
          <div class="actions">
            <button class="btn btn-primary btn-sm" onclick="window.viewResponse('${item.id}')">👁️ View</button>
            <button class="btn btn-danger btn-sm" onclick="window.deleteResponse('${item.id}')">🗑️ Delete</button>
          </div>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

// ============================================================
//  VIEW RESPONSE (Modal)
// ============================================================
export async function viewResponse(participantId) {
  const token = getToken();
  if (!token) return;

  try {
    const data = await apiClient.get('/admin/responses', token);
    const participant = data.find(p => p.id === participantId);
    if (!participant) throw new Error('Participant not found');

    const answers = participant.responses && participant.responses.length > 0
      ? participant.responses[0].answers || {}
      : {};

    let bodyHtml = `
      <div class="review-section">
        <div class="section-title">👤 Participant Info</div>
        <div class="review-item"><span class="label">الاسم</span><span class="value">${participant.fullName || '—'}</span></div>
        <div class="review-item"><span class="label">القسم</span><span class="value">${participant.department || '—'}</span></div>
        <div class="review-item"><span class="label">السنة</span><span class="value">${participant.studyYear || '—'}</span></div>
        <div class="review-item"><span class="label">الجنس</span><span class="value">${participant.gender || '—'}</span></div>
        <div class="review-item"><span class="label">العمر</span><span class="value">${participant.age || '—'}</span></div>
        <div class="review-item"><span class="label">التاريخ</span><span class="value">${participant.registeredAt ? formatDate(participant.registeredAt) : '—'}</span></div>
      </div>
      <div class="review-section"><div class="section-title">📋 Answers</div>`;

    questions.forEach(q => {
      const ans = answers[q.id] || [];
      const display = ans.length > 0 ? ans.join('، ') : '—';
      const enDisplay = ans.map(a => {
        const found = q.options.find(o => o.ar === a);
        return found ? found.en : a;
      }).join(', ');
      bodyHtml += `
        <div class="review-item">
          <span class="label">${q.arabic}</span>
          <span class="value">${display} <span class="value-en">${enDisplay}</span></span>
        </div>`;
    });
    bodyHtml += `</div>`;

    document.getElementById('modalTitle').textContent = `📄 ${participant.fullName || 'Participant'} – الإجابات`;
    document.getElementById('modalBody').innerHTML = bodyHtml;
    document.getElementById('responseModal').classList.add('open');
  } catch (error) {
    alert('Error loading response: ' + error.message);
  }
}

// ============================================================
//  DELETE RESPONSE
// ============================================================
export async function deleteResponse(participantId) {
  if (!confirm('هل أنت متأكد من حذف هذه الإجابة؟ / Are you sure you want to delete this response?')) return;

  const token = getToken();
  if (!token) return;

  try {
    await apiClient.delete(`/admin/responses/${participantId}`, token);
    await renderAdminDashboard();
  } catch (error) {
    alert('Delete failed: ' + error.message);
  }
}

// ============================================================
//  EXPORT CSV
// ============================================================
export async function exportCSV() {
  const token = getToken();
  if (!token) {
    alert('Please login first.');
    return;
  }

  try {
    const data = await apiClient.get('/admin/responses', token);
    if (data.length === 0) {
      alert('لا توجد بيانات للتصدير. / No data to export.');
      return;
    }

    const headers = ['fullName', 'department', 'studyYear', 'gender', 'age', 'registeredAt'];
    const qIds = questions.map(q => q.id);
    const allHeaders = [...headers, ...qIds];

    let csv = allHeaders.join(',') + '\n';

    data.forEach(item => {
      const answers = item.responses && item.responses.length > 0
        ? item.responses[0].answers || {}
        : {};
      const row = [
        `"${(item.fullName || '').replace(/"/g, '""')}"`,
        `"${(item.department || '').replace(/"/g, '""')}"`,
        `"${(item.studyYear || '').replace(/"/g, '""')}"`,
        `"${(item.gender || '').replace(/"/g, '""')}"`,
        `"${(item.age || '')}"`,
        `"${item.registeredAt || ''}"`,
      ];
      qIds.forEach(qid => {
        const val = answers[qid] ? answers[qid].join('; ') : '';
        row.push(`"${val.replace(/"/g, '""')}"`);
      });
      csv += row.join(',') + '\n';
    });

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `cosmetovigilance_export_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    alert('Export failed: ' + error.message);
  }
}