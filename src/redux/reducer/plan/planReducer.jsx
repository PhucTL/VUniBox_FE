import { PLAN_ACTION_TYPES } from '../../actions/plan/planActionTypes';

const initialState = {
  // Plan Data
  plans: [],
  currentPlan: null,
  
  // Loading States
  isLoading: false,
  isGetAllPlansLoading: false,
  isSubscribePlanLoading: false,
  isCancelSubscriptionLoading: false,
  isGetCurrentPlanLoading: false,
  
  // Success States
  getAllPlansSuccess: false,
  subscribePlanSuccess: false,
  cancelSubscriptionSuccess: false,
  getCurrentPlanSuccess: false,
  
  // Error States
  error: null,
  getAllPlansError: null,
  subscribePlanError: null,
  cancelSubscriptionError: null,
  getCurrentPlanError: null,
};

const planReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET ALL PLANS Cases
    case PLAN_ACTION_TYPES.GET_ALL_PLANS_REQUEST:
      return {
        ...state,
        isGetAllPlansLoading: true,
        isLoading: true,
        getAllPlansError: null,
        getAllPlansSuccess: false,
      };
    case PLAN_ACTION_TYPES.GET_ALL_PLANS_SUCCESS:
      return {
        ...state,
        isGetAllPlansLoading: false,
        isLoading: false,
        plans: action.payload,
        getAllPlansError: null,
        getAllPlansSuccess: true,
        error: null,
      };
    case PLAN_ACTION_TYPES.GET_ALL_PLANS_FAILURE:
      return {
        ...state,
        isGetAllPlansLoading: false,
        isLoading: false,
        getAllPlansError: action.payload,
        getAllPlansSuccess: false,
        error: action.payload,
      };

    // SUBSCRIBE PLAN Cases
    case PLAN_ACTION_TYPES.SUBSCRIBE_PLAN_REQUEST:
      return {
        ...state,
        isSubscribePlanLoading: true,
        isLoading: true,
        subscribePlanError: null,
        subscribePlanSuccess: false,
      };
    case PLAN_ACTION_TYPES.SUBSCRIBE_PLAN_SUCCESS:
      return {
        ...state,
        isSubscribePlanLoading: false,
        isLoading: false,
        subscribePlanError: null,
        subscribePlanSuccess: true,
        error: null,
      };
    case PLAN_ACTION_TYPES.SUBSCRIBE_PLAN_FAILURE:
      return {
        ...state,
        isSubscribePlanLoading: false,
        isLoading: false,
        subscribePlanError: action.payload,
        subscribePlanSuccess: false,
        error: action.payload,
      };

    // CANCEL SUBSCRIPTION Cases
    case PLAN_ACTION_TYPES.CANCEL_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        isCancelSubscriptionLoading: true,
        isLoading: true,
        cancelSubscriptionError: null,
        cancelSubscriptionSuccess: false,
      };
    case PLAN_ACTION_TYPES.CANCEL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        isCancelSubscriptionLoading: false,
        isLoading: false,
        cancelSubscriptionError: null,
        cancelSubscriptionSuccess: true,
        error: null,
      };
    case PLAN_ACTION_TYPES.CANCEL_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        isCancelSubscriptionLoading: false,
        isLoading: false,
        cancelSubscriptionError: action.payload,
        cancelSubscriptionSuccess: false,
        error: action.payload,
      };

    // GET CURRENT PLAN Cases
    case PLAN_ACTION_TYPES.GET_CURRENT_PLAN_REQUEST:
      return {
        ...state,
        isGetCurrentPlanLoading: true,
        isLoading: true,
        getCurrentPlanError: null,
        getCurrentPlanSuccess: false,
      };
    case PLAN_ACTION_TYPES.GET_CURRENT_PLAN_SUCCESS:
      return {
        ...state,
        isGetCurrentPlanLoading: false,
        isLoading: false,
        currentPlan: action.payload,
        getCurrentPlanError: null,
        getCurrentPlanSuccess: true,
        error: null,
      };
    case PLAN_ACTION_TYPES.GET_CURRENT_PLAN_FAILURE:
      return {
        ...state,
        isGetCurrentPlanLoading: false,
        isLoading: false,
        getCurrentPlanError: action.payload,
        getCurrentPlanSuccess: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default planReducer;