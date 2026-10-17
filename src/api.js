// Alamat API diambil dari file .env
const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  // Jika user sudah login, kirim token ke header Authorization
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if(!response.ok) {
    const error = new Error(data.message || 'Terjadi kesalahan pada server Laravel');
    error.status = response.status;
    error.errors = data.errors;
    throw error;
  }

  return data;
}