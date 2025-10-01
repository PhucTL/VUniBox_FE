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

  // Register API call
  register: async (userData) => {
    try {
      console.log('Register API - Sending data:', userData);
      
      const requestPayload = {
        email: userData.email,
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        password: userData.password,
        confirmPassword: userData.confirmPassword
      };
      
      console.log('Register API - Request payload:', requestPayload);
      
      const response = await axios.post('/api/authentication/register', requestPayload);
      
      console.log('Register API - Full response:', response);
      console.log('Register API - Response data:', response.data);
      
      // Backend response structure: { code, message, result }
      // Sometimes axios puts the actual response in response directly, not response.data
      const responseData = response.data || response;
      
      // Check if backend indicates success
      if (responseData.code === 200 || responseData.code === 201) {
        return {
          success: true,
          message: responseData.message || 'Đăng ký thành công',
          data: responseData.result
        };
      } else {
        throw new Error(responseData.message || 'Register failed');
      }
    } catch (error) {
      console.log('Register API - Error occurred:', error);
      console.log('Register API - Error response:', error.response);
      console.log('Register API - Error response data:', error.response?.data);
      console.log('Register API - Error status:', error.response?.status);
      console.log('Register API - Error message:', error.message);
      
      // Handle .NET validation errors (400 Bad Request with errors object)
      if (error.response?.status === 400 && error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = [];
        
        // Extract validation error messages
        Object.keys(errors).forEach(field => {
          if (Array.isArray(errors[field])) {
            errors[field].forEach(msg => {
              // Translate common validation messages
              if (msg.includes('minimum length') && msg.includes('8')) {
                errorMessages.push('Mật khẩu phải có ít nhất 8 ký tự');
              } else {
                errorMessages.push(msg);
              }
            });
          }
        });
        
        throw new Error(errorMessages.join('. ') || 'Dữ liệu không hợp lệ');
      }
      
      // If backend returns structured error
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      
      if (error.response?.data?.title) {
        throw new Error(error.response.data.title);
      }
      
      if (error.response?.data) {
        throw new Error(JSON.stringify(error.response.data));
      }
      
      throw new Error(error.message || 'Đăng ký thất bại');
    }
  },

  // Forgot Password - Step 1: Verify email and phone
  forgotPasswordVerify: async (verifyData) => {
    try {
      console.log('Verify API - Sending data:', verifyData);
      
      const response = await axios.post('/api/authentication/forgot-password/verify', {
        email: verifyData.email,
        phoneNumber: verifyData.phoneNumber
      });
      
      console.log('Verify API - Full response:', response);
      console.log('Verify API - Response headers:', response.headers);
      console.log('Verify API - Response cookies:', document.cookie);
      const responseData = response.data || response;
      console.log('Verify API - Response data:', responseData);
      
      if (responseData.code === 200) {
        // Store verification success with timestamp for backend validation
        const sessionData = {
          verified: true,
          verifyTimestamp: Date.now(),
          email: verifyData.email,
          phoneNumber: verifyData.phoneNumber
        };
        localStorage.setItem('forgotPasswordSession', JSON.stringify(sessionData));
        console.log('Verify API - Saved session data:', sessionData);
        
        return {
          success: true,
          message: responseData.message || 'Xác thực thành công',
          data: responseData.result
        };
      } else {
        throw new Error(responseData.message || 'Xác thực thất bại');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        throw error.response.data.message;
      }
      throw error.response?.data || error.message;
    }
  },

  // Forgot Password - Step 2: Reset password  
  forgotPasswordReset: async (resetData) => {
    try {
      console.log('Reset Password - Starting reset API call');
      console.log('Reset Password - Data:', resetData);
      
      // Get verified email and phone from localStorage session
      const sessionData = localStorage.getItem('forgotPasswordSession');
      let requestBody = {
        newPassword: resetData.newPassword,
        confirmPassword: resetData.confirmPassword
      };
      
      // Add verified email and phone to reset request
      if (sessionData) {
        try {
          const parsedSession = JSON.parse(sessionData);
          if (parsedSession.email && parsedSession.phoneNumber) {
            requestBody.email = parsedSession.email;
            requestBody.phoneNumber = parsedSession.phoneNumber;
            // Try without timestamp first
          }
        } catch (parseError) {
          console.log('Session parse error:', parseError);
        }
      }
      
      console.log('Reset Password - Final request body:', requestBody);
      
      // Reset API with verified email + phone + new passwords
      const response = await axios.post('/api/authentication/forgot-password/reset', requestBody);
      
      console.log('Reset Password - Success response:', response);
      
      const responseData = response.data || response;
      
      if (responseData.code === 200) {
        // Clear session data after successful reset
        localStorage.removeItem('forgotPasswordSession');
        
        return {
          success: true,
          message: responseData.message || 'Đặt lại mật khẩu thành công',
          data: responseData.result
        };
      } else {
        throw new Error(responseData.message || 'Đặt lại mật khẩu thất bại');
      }
    } catch (error) {
      console.log('Reset Password - Error:', error);
      console.log('Reset Password - Error response:', error.response?.data);
      
      if (error.response?.data?.message) {
        throw error.response.data.message;  
      }
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