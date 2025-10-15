import { ADMIN_DASHBOARD_ACTION_TYPES } from './adminDashboardActionTypes';

export const adminDashboardActions = {
  getDashboardDataRequest: () => ({
    type: ADMIN_DASHBOARD_ACTION_TYPES.GET_DASHBOARD_DATA_REQUEST
  }),

  getDashboardDataSuccess: (data) => ({
    type: ADMIN_DASHBOARD_ACTION_TYPES.GET_DASHBOARD_DATA_SUCCESS,
    payload: data
  }),

  getDashboardDataFailure: (error) => ({
    type: ADMIN_DASHBOARD_ACTION_TYPES.GET_DASHBOARD_DATA_FAILURE,
    payload: error
  }),

  clearDashboardData: () => ({
    type: ADMIN_DASHBOARD_ACTION_TYPES.CLEAR_DASHBOARD_DATA
  })
};