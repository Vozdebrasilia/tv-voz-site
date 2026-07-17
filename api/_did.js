function didAuthHeader() {
  const key = process.env.DID_API_KEY || '';
  if (!key) throw new Error('DID_API_KEY não configurada no Vercel.');
  
  return key;
}

async function parseDidResponse(response) {
  const text = await response.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!response.ok) {
    const message = data?.description || data?.message || data?.error || `Erro D-ID ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

async function didFetch(path, options = {}) {
  const response = await fetch(`https://api.d-id.com${path}`, {
    ...options,
    headers: {
      Authorization: didAuthHeader(),
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {})
    }
  });
  return parseDidResponse(response);
}

async function didUploadImage(buffer, filename, mimeType = 'image/jpeg') {
  const form = new FormData();
  const blob = new Blob([buffer], { type: mimeType });
  form.append('image', blob, filename);
  form.append('detect_faces', 'true');

  const response = await fetch('https://api.d-id.com/images', {
    method: 'POST',
    headers: {
      Authorization: didAuthHeader(),
      Accept: 'application/json'
    },
    body: form
  });
  return parseDidResponse(response);
}

module.exports = { didFetch, didUploadImage };
