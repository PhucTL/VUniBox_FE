import axios from '../../utils/axiosCustomize';

// Google Auth API Service
const googleAuthService = {
  // Google OAuth login
  googleLogin: async (idToken) => {
    try {
      const response = await axios.post('/api/authentication/google-login', {
        idToken: idToken
      });
      
      // API returns data in response format
      const responseData = response;
      
      // Check if backend indicates success
      if (responseData.code === 200 && responseData.result) {
        const { result } = responseData;
        
        // Store token in localStorage
        if (result.token) {
          localStorage.setItem('accessToken', result.token);
        }
        
        // Return formatted data for Redux
        return {
          access_token: result.token,
          user: {
            id: result.userId,
            email: result.email,
            fullName: result.fullName,
            role: result.role
          },
          tokenExpiresAt: result.tokenExpiresAt
        };
      } else {
        throw new Error(responseData.message || 'Google login failed');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        throw error.response.data.message;
      }
      throw error.response?.data || error.message;
    }
  }
};

export default googleAuthService;