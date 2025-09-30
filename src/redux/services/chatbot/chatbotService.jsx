import axios from "../../utils/axiosCustomize";

const chatbotService = {
  // Gửi tin nhắn đến chatbot
  sendMessage: async (userId, message) => {
    try {
      const response = await axios.post("/api/chatbot/send", {
        userId,
        message
      });
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy lịch sử chat
  getChatHistory: async (userId) => {
    try {
      const response = await axios.get(`/api/chatbot/history?userId=${userId}`);
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Xóa lịch sử chat (tạo session mới)
  clearChatHistory: async (userId) => {
    try {
      const response = await axios.post("/api/chatbot/clear", { userId });
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default chatbotService;