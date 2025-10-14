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
      // Only send fullName and phoneNumber to match API
      const updateData = {
        fullName: profileData.fullName,
        phoneNumber: profileData.phoneNumber
      };
      const response = await axios.put(`/api/userProfile/${userId}`, updateData);
      return response?.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upload avatar
  uploadAvatar: async (userId, file) => {
    try {
      const formData = new FormData();
      formData.append("avatarFile", file); // Changed from "avatar" to "avatarFile"
      
      const response = await axios.post(
        `/api/userProfile/${userId}/upload-avatar`,
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

  // Delete avatar
  deleteAvatar: async (userId) => {
    try {
      const response = await axios.delete(`/api/userProfile/${userId}/avatar`);
      return response?.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default userService;