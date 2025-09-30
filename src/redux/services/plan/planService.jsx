import axios from "../../utils/axiosCustomize";

// Plan API Service
const planService = {
  // Lấy danh sách tất cả các gói dịch vụ
  getAllPlans: async () => {
    try {
      const response = await axios.get("/api/plan");
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Đăng ký gói dịch vụ với PayOS
  subscribePlan: async (planId, userId, promoCode = null) => {
    try {
      const response = await axios.post("/api/subscription/payos", {
        planId,
        userId,
        promoCode
      });
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Kiểm tra trạng thái thanh toán PayOS
  checkPaymentStatus: async (orderCode) => {
    try {
      const response = await axios.get(`/api/subscription/payos/check/${orderCode}`);
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Hủy gói dịch vụ
  cancelSubscription: async (userId) => {
    try {
      const response = await axios.post("/api/plan/cancel", {
        userId
      });
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy thông tin gói hiện tại của user
  getCurrentPlan: async (userId) => {
    try {
      const response = await axios.get(`/api/plan/current/${userId}`);
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy thông tin subscription với ngày hết hạn
  getUserSubscription: async (userId) => {
    try {
      const response = await axios.get(`/api/subscription/user/${userId}/current`);
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default planService;
