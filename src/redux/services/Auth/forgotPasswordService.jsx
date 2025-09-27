import axios from '../../utils/axiosCustomize';

const forgotPasswordService = {
  verifyAndReset: async (verifyData, resetData) => {
    try {
      // Verify email and phone number
      const verifyResponse = await axios.post('/api/authentication/forgot-password/verify', {
        email: verifyData.email,
        phoneNumber: verifyData.phoneNumber
      }, {
        withCredentials: true
      });
      
      const verifyResponseData = verifyResponse.data || verifyResponse;
      
      if (verifyResponseData.code !== 200) {
        throw new Error(verifyResponseData.message || 'Xác thực thất bại');
      }
      
    //  Reset password
      const resetResponse = await axios.post('/api/authentication/forgot-password/reset', {
        email: verifyData.email,
        phoneNumber: verifyData.phoneNumber,
        newPassword: resetData.newPassword,
        confirmPassword: resetData.confirmPassword
      }, {
        withCredentials: true
      });
      
      const resetResponseData = resetResponse.data || resetResponse;
      
      if (resetResponseData.code === 200) {
        return {
          success: true,
          message: resetResponseData.message || 'Đặt lại mật khẩu thành công',
          data: resetResponseData.result
        };
      } else {
        throw new Error(resetResponseData.message || 'Đặt lại mật khẩu thất bại');
      }
      
    } catch (error) {
      if (error.response?.data?.message) {
        throw error.response.data.message;
      }
      throw error.response?.data || error.message;
    }
  }
};

export default forgotPasswordService;