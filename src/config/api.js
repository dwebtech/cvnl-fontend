// API Configuration
// Sử dụng environment variable hoặc fallback về localhost

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export const config = {
  apiUrl: API_URL,
  socketUrl: SOCKET_URL,
  apiBase: `${API_URL}/api`,
};

export default config;
