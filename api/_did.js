function didAuthHeader() {
  const key = String(process.env.DID_API_KEY || '').trim();
  if (!key) throw new Error('DID_API_KEY não configurada no Vercel.');
  return key.startsWith('Basic ') ? key : `Basic ${key}`;
}

async function didFetch(path, options = {}) {
  const response = await fetch(`https://api.d-id.com${path}`, {
    ...options,
    headers: {
      Authorization: didAuthHeader(),
      Accept: 'application/json',
      ...(options.body ? {'Content-Type':'application/json'} : {}),
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = {raw:text}; }

  if (!response.ok) {
    const error = new Error(data?.description || data?.message || `Erro D-ID ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

module.exports = { didFetch };
