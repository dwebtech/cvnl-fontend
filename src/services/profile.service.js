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

export const profileService = {
  // Get profile
  async getProfile(userId = null) {
    try {
      const url = userId ? `/profile/profile/${userId}` : '/profile/profile';
      const response = await api.get(url);
      return response.data.profile;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tải profile');
    }
  },

  // Update profile
  async updateProfile(data) {
    try {
      const response = await api.put('/profile/profile', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Cập nhật profile thất bại');
    }
  },

  // Upload avatar
  async uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await api.post('/profile/profile/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.avatar;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Upload avatar thất bại');
    }
  },

  // Upload cover
  async uploadCover(file) {
    try {
      const formData = new FormData();
      formData.append('cover', file);
      const response = await api.post('/profile/profile/cover', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.cover_image;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Upload cover thất bại');
    }
  },

  // Request verification
  async requestVerification() {
    try {
      const response = await api.post('/profile/profile/verify/request');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Yêu cầu xác thực thất bại');
    }
  },

  // Upload verification image
  async uploadVerificationImage(file) {
    try {
      const formData = new FormData();
      formData.append('verification_image', file);
      const response = await api.post('/profile/profile/verify/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Upload ảnh xác thực thất bại');
    }
  },

  // Update location
  async updateLocation(latitude, longitude) {
    try {
      const response = await api.put('/profile/profile/location', { latitude, longitude });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Cập nhật vị trí thất bại');
    }
  },

  // Toggle location visibility
  async toggleLocationVisibility(isHidden) {
    try {
      const response = await api.put('/profile/profile/hide-location', { is_hidden: isHidden });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Cập nhật trạng thái vị trí thất bại');
    }
  },

  // Get gallery
  async getGallery(userId = null) {
    try {
      const url = userId ? `/profile/profile/${userId}/gallery` : '/profile/profile/gallery';
      const response = await api.get(url);
      return response.data.gallery;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tải gallery');
    }
  },

  // Add to gallery
  async addToGallery(file, isPrivate = false, coinsRequired = 0) {
    try {
      const formData = new FormData();
      formData.append('gallery_image', file);
      formData.append('is_private', isPrivate);
      formData.append('coins_required', coinsRequired);
      const response = await api.post('/profile/profile/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Thêm ảnh vào gallery thất bại');
    }
  },
};

export default profileService;
