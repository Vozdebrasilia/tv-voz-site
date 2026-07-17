function apiKey() {
  const key = String(process.env.DID_API_KEY || '').trim();
  if (!key) throw new Error('DID_API_KEY não configurada no Vercel.');
  return key;
}

function authCandidates() {
  const key = apiKey();
  if (/^(Basic|Bearer)\s+/i.test(key)) return [key];
  return [`Basic ${key}`, `Bearer ${key}`];
}

async function parseBody(response) {
  const text = await response.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  return data;
}

async function didFetch(path, options = {}) {
  let lastError;
  for (const authorization of authCandidates()) {
    const response = await fetch(`https://api.d-id.com${path}`, {
      ...options,
      headers: {
        Authorization: authorization,
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {})
      }
    });
    const data = await parseBody(response);
    if (response.ok) return data;
    const message = data?.description || data?.message || data?.error || `Erro D-ID ${response.status}`;
    const error = new Error(typeof message === 'string' ? message : JSON.stringify(message));
    error.status = response.status;
    error.data = data;
    lastError = error;
    if (response.status !== 401 && response.status !== 403) break;
  }
  throw lastError || new Error('Falha de autenticação na D-ID.');
}

module.exports = { didFetch };
