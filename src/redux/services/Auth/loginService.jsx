import axios from '../../utils/axiosCustomize';

// Auth API Service
const authService = {
  // Login API call
  login: async (credentials) => {
    try {
      const response = await axios.post('/api/authentication/login', {
        email: credentials.email,
        username: credentials.email, // Send both email and username to be safe
        password: credentials.password
      });
      
      // Backend response structure: { code, message, result }
      // Axios interceptor returns response.data, so response here is actually response.data
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
        // Backend returned error in response body
        throw new Error(responseData.message || 'Login failed');
      }
    } catch (error) {
      // If backend returns structured error
      if (error.response?.data?.message) {
        throw error.response.data.message;
      }
      
      throw error.response?.data || error.message;
    }
  },

  // Register API call (assuming similar endpoint exists)
  register: async (userData) => {
    try {
      const response = await axios.post('/api/authentication/register', {
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