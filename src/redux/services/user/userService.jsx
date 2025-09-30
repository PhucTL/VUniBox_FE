import axios from "../../utils/axiosCustomize";

// User Profile API Service
const userService = {
  // Lấy thông tin profile của user
  getUserProfile: async (userId) => {
    try {
      const response = await axios.get(`/api/userProfile/${userId}`);
      return response?.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy thông tin storage của user
  getUserStorage: async (userId) => {
    try {
      const response = await axios.get(`/api/userProfile/${userId}/storage`);
      return response?.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Cập nhật thông tin profile
  updateProfile: async (userId, profileData) => {
    try {
      const response = await axios.put(`/api/userProfile/${userId}`, profileData);
      return response?.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upload avatar
  uploadAvatar: async (userId, file) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      
      const response = await axios.post(
        `/api/userProfile/${userId}/avatar`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response?.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default userService;