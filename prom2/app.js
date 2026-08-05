// Shared Firebase Realtime Database helpers for the Prom Vote app.
// Reuses the same Firebase project already used by the Felician2026 site,
// under its own top-level path so it never collides with existing data.
const FB_URL = 'https://felician2026-c1d93-default-rtdb.firebaseio.com';
const PV_PATH = 'promvote2';

async function fbGet(path) {
  const r = await fetch(`${FB_URL}/${PV_PATH}/${path}.json`, { cache: 'no-store' });
  return r.ok ? r.json() : null;
}

async function fbPush(path, data) {
  const r = await fetch(`${FB_URL}/${PV_PATH}/${path}.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return r.ok ? r.json() : null;
}

async function fbSet(path, data) {
  const r = await fetch(`${FB_URL}/${PV_PATH}/${path}.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return r.ok ? r.json() : null;
}

async function fbDelete(path) {
  const r = await fetch(`${FB_URL}/${PV_PATH}/${path}.json`, { method: 'DELETE' });
  return r.ok;
}

function pvDeviceId() {
  let id = localStorage.getItem('pv_device_t2');
  if (!id) {
    id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    localStorage.setItem('pv_device_t2', id);
  }
  return id;
}

function objToArray(obj) {
  if (!obj) return [];
  return Object.entries(obj).map(([id, v]) => ({ id, ...v }));
}
