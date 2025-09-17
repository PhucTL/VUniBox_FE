import axios from '../../utils/axiosCustomize';

// Google Auth API Service
const googleAuthService = {
  // Google OAuth login
  googleLogin: async (idToken) => {
    try {
      const response = await axios.post('/authentication/google-sessions', {
        idToken: idToken
      });
      
      // API returns data in response.result format
      const { result } = response;
      
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
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default googleAuthService;