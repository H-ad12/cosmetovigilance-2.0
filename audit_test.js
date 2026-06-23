const base = 'http://localhost:5001/api';

async function main() {
  try {
    console.log('=== REGISTER PARTICIPANT ===');
    let res = await fetch(`${base}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: 'Audit User', studyYear: 'Year 1', gender: 'ذكر', age: '30' })
    });
    console.log('register status', res.status, 'content-type', res.headers.get('content-type'));
    const regBody = await res.text();
    console.log('register body', regBody);
    const regData = JSON.parse(regBody);
    if (!regData.id) throw new Error('register id missing');

    console.log('=== SUBMIT SURVEY ===');
    res = await fetch(`${base}/survey/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participantId: regData.id, answers: { q1: ['يومياً'], q2: ['علامات تجارية / صيدليات'] } })
    });
    console.log('submit status', res.status, 'content-type', res.headers.get('content-type'));
    const submitBody = await res.text();
    console.log('submit body', submitBody);

    console.log('=== ADMIN LOGIN ===');
    res = await fetch(`${base}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@survey.edu', password: 'academic-admin-2026' })
    });
    console.log('login status', res.status, 'content-type', res.headers.get('content-type'));
    const loginBody = await res.json();
    console.log('login body', loginBody);
    const token = loginBody.token;
    if (!token) throw new Error('admin token missing');

    console.log('=== GET RESPONSES ===');
    res = await fetch(`${base}/admin/responses`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('responses status', res.status, 'content-type', res.headers.get('content-type'));
    const list = await res.json();
    console.log('responses count', Array.isArray(list) ? list.length : 'not array');
    if (!Array.isArray(list)) throw new Error('responses not array');

    console.log('=== DELETE RESPONSE ===');
    const deleteId = list.find(item => item.id === regData.id)?.id || list[0]?.id;
    if (!deleteId) throw new Error('no response id to delete');
    res = await fetch(`${base}/admin/responses/${deleteId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('delete status', res.status, 'content-type', res.headers.get('content-type'));
    const deleteText = await res.text();
    console.log('delete body', deleteText);
    if (res.status !== 200) throw new Error('unexpected delete status');
    const deleteData = JSON.parse(deleteText);
    if (!deleteData.success) throw new Error('delete success missing');

    console.log('=== RECHECK RESPONSES ===');
    res = await fetch(`${base}/admin/responses`, { headers: { Authorization: `Bearer ${token}` } });
    const reList = await res.json();
    console.log('responses count after delete', reList.length);

    console.log('AUDIT COMPLETE ✅');
  } catch (error) {
    console.error('AUDIT ERROR', error);
    process.exit(1);
  }
}

main();
