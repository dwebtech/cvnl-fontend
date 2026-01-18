import axios from 'axios';
import config from '../config/api';

const api = axios.create({
  baseURL: config.apiBase,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth service
export const authService = {
  // Login
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Đăng nhập thất bại');
    }
  },

  // Register - Request OTP
  async requestOTP(email, password) {
    try {
      const response = await api.post('/auth/register/request-otp', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Gửi mã OTP thất bại');
    }
  },

  // Register - Verify OTP
  async verifyOTPAndRegister(email, password, code) {
    try {
      const response = await api.post('/auth/register/verify', {
        email,
        password,
        code,
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Đăng ký thất bại');
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
};

export default authService;
