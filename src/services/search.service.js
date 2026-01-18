import axios from 'axios';
import config from '../config/api';

const api = axios.create({
  baseURL: config.apiBase,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const searchService = {
  // Get nearby users
  async getNearbyUsers(params) {
    try {
      const response = await api.get('/search/nearby', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tìm kiếm người dùng');
    }
  },
};

export default searchService;
