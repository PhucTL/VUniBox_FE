import axios from '../../utils/axiosCustomize';

const adminDashboardService = {
  getDashboardData: async () => {
    try {
      const response = await axios.get('/api/admin/dashboard');
      
      // Note: axios interceptor already returns response.data, so 'response' here is actually the data
      // Backend returns data in result field
      if (response && response.result) {
        return response.result;
      }
      
      return response;
    } catch (error) {
      console.error('Admin dashboard API error:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to fetch dashboard data';
      
      throw new Error(errorMessage);
    }
  }
};

export default adminDashboardService;