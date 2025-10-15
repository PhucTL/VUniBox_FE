import { ADMIN_DASHBOARD_ACTION_TYPES } from '../../actions/admin/adminDashboardActionTypes';

const initialState = {
  data: null,
  loading: false,
  error: null
};

const adminDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_DASHBOARD_ACTION_TYPES.GET_DASHBOARD_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ADMIN_DASHBOARD_ACTION_TYPES.GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };

    case ADMIN_DASHBOARD_ACTION_TYPES.GET_DASHBOARD_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case ADMIN_DASHBOARD_ACTION_TYPES.CLEAR_DASHBOARD_DATA:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

export default adminDashboardReducer;