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

export const chatService = {
  // Get conversations
  async getConversations() {
    try {
      const response = await api.get('/chat/conversations');
      return response.data.conversations;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tải cuộc trò chuyện');
    }
  },

  // Get messages
  async getMessages(userId, limit = 50, offset = 0) {
    try {
      const response = await api.get(`/chat/messages/${userId}`, {
        params: { limit, offset },
      });
      return response.data.messages;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tải tin nhắn');
    }
  },

  // Send message (backup API, mainly use Socket.io)
  async sendMessage(receiverId, content, type = 'text', mediaUrl = null, replyToMessageId = null) {
    try {
      const response = await api.post('/chat/message', {
        receiver_id: receiverId,
        content,
        type,
        media_url: mediaUrl,
        reply_to_message_id: replyToMessageId,
      });
      return response.data.message;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Gửi tin nhắn thất bại');
    }
  },

  // Unsend message
  async unsendMessage(messageId) {
    try {
      const response = await api.put(`/chat/message/${messageId}/unsend`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Thu hồi tin nhắn thất bại');
    }
  },

  // Pin message
  async pinMessage(messageId) {
    try {
      const response = await api.put(`/chat/message/${messageId}/pin`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Ghim tin nhắn thất bại');
    }
  },

  // Add reaction
  async addReaction(messageId, emoji) {
    try {
      const response = await api.post(`/chat/message/${messageId}/reaction`, { emoji });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Thêm reaction thất bại');
    }
  },
};

export default chatService;
