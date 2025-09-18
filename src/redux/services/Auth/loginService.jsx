import axios from '../../utils/axiosCustomize';

// Auth API Service
const authService = {
  // Login API call
  login: async (credentials) => {
    try {
      const response = await axios.post('/authentication/login', {
        username: credentials.email, // API expects username field
        password: credentials.password
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
  },

  // Register API call (assuming similar endpoint exists)
  register: async (userData) => {
    try {
      const response = await axios.post('/authentication/register', {
        username: userData.email,
        password: userData.password,
        name: userData.name
      });
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout - clear tokens
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('accessToken');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  }
};

export default authService;