import { createAsyncThunk } from '@reduxjs/toolkit';
import chatbotService from '../../services/chatbot/chatbotService';
import { toast } from 'react-toastify';

// Gửi tin nhắn
export const sendMessageThunk = createAsyncThunk(
  'chatbot/sendMessage',
  async ({ userId, message }, { rejectWithValue }) => {
    try {
      const response = await chatbotService.sendMessage(userId, message);
      return {
        userMessage: message,
        botResponse: response.result.response,
        messageCount: response.result.messageCount,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      toast.error('Không thể gửi tin nhắn');
      return rejectWithValue(error.message || 'Gửi tin nhắn thất bại');
    }
  }
);

// Lấy lịch sử chat
export const getChatHistoryThunk = createAsyncThunk(
  'chatbot/getChatHistory',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await chatbotService.getChatHistory(userId);
      return response.result || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Lấy lịch sử chat thất bại');
    }
  }
);

// Xóa lịch sử chat
export const clearChatHistoryThunk = createAsyncThunk(
  'chatbot/clearChatHistory',
  async (userId, { rejectWithValue }) => {
    try {
      await chatbotService.clearChatHistory(userId);
      toast.success('Đã tạo cuộc trò chuyện mới');
      return true;
    } catch (error) {
      toast.error('Không thể xóa lịch sử chat');
      return rejectWithValue(error.message || 'Xóa lịch sử chat thất bại');
    }
  }
);