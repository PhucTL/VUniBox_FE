import { adminDashboardActions } from '../../actions/admin';
import adminDashboardService from '../../services/admin/adminDashboardService';

export const getDashboardDataThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(adminDashboardActions.getDashboardDataRequest());
      
      const data = await adminDashboardService.getDashboardData();
      
      dispatch(adminDashboardActions.getDashboardDataSuccess(data));
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to fetch dashboard data';
      
      dispatch(adminDashboardActions.getDashboardDataFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };
};

export const clearDashboardDataThunk = () => {
  return (dispatch) => {
    dispatch(adminDashboardActions.clearDashboardData());
  };
};