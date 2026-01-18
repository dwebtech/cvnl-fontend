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

export const matchService = {
  // Get discovery feed
  async getDiscovery() {
    try {
      const response = await api.get('/match/discover');
      return response.data.users;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tải discovery feed');
    }
  },

  // Swipe (like/pass)
  async swipe(targetUserId, action) {
    try {
      const response = await api.post('/match/swipe', { target_user_id: targetUserId, action });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Swipe thất bại');
    }
  },

  // Get matches
  async getMatches() {
    try {
      const response = await api.get('/match/matches');
      return response.data.matches;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tải matches');
    }
  },

  // Get likes received (VIP only)
  async getLikesReceived() {
    try {
      const response = await api.get('/match/likes-received');
      return response.data.likes;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tải likes received');
    }
  },

  // Get profile views (VIP only)
  async getProfileViews() {
    try {
      const response = await api.get('/match/profile-views');
      return response.data.views;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tải profile views');
    }
  },
};

export default matchService;
