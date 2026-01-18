// API Configuration
// Sử dụng environment variable hoặc fallback về localhost

const API_URL = import.meta.env.VITE_API_URL || 'https://darkslategray-snake-626086.hostingersite.com';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://darkslategray-snake-626086.hostingersite.com';

export const config = {
  apiUrl: API_URL,
  socketUrl: SOCKET_URL,
  apiBase: `${API_URL}/api`,
};

export default config;
