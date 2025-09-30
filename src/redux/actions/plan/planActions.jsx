// Plan Action Creators
import { PLAN_ACTION_TYPES } from './planActionTypes';

// Get All Plans Actions
export const getAllPlansRequest = () => ({
  type: PLAN_ACTION_TYPES.GET_ALL_PLANS_REQUEST,
});
export const getAllPlansSuccess = (plans) => ({
  type: PLAN_ACTION_TYPES.GET_ALL_PLANS_SUCCESS,
  payload: plans,
});
export const getAllPlansFailure = (error) => ({
  type: PLAN_ACTION_TYPES.GET_ALL_PLANS_FAILURE,
  payload: error,
});

// Subscribe Plan Actions
export const subscribePlanRequest = () => ({
  type: PLAN_ACTION_TYPES.SUBSCRIBE_PLAN_REQUEST,
});
export const subscribePlanSuccess = (subscriptionInfo) => ({
  type: PLAN_ACTION_TYPES.SUBSCRIBE_PLAN_SUCCESS,
  payload: subscriptionInfo,
});
export const subscribePlanFailure = (error) => ({
  type: PLAN_ACTION_TYPES.SUBSCRIBE_PLAN_FAILURE,
  payload: error,
});

// Cancel Subscription Actions
export const cancelSubscriptionRequest = () => ({
  type: PLAN_ACTION_TYPES.CANCEL_SUBSCRIPTION_REQUEST,
});
export const cancelSubscriptionSuccess = (result) => ({
  type: PLAN_ACTION_TYPES.CANCEL_SUBSCRIPTION_SUCCESS,
  payload: result,
});
export const cancelSubscriptionFailure = (error) => ({
  type: PLAN_ACTION_TYPES.CANCEL_SUBSCRIPTION_FAILURE,
  payload: error,
});

// Get Current Plan Actions
export const getCurrentPlanRequest = () => ({
  type: PLAN_ACTION_TYPES.GET_CURRENT_PLAN_REQUEST,
});
export const getCurrentPlanSuccess = (currentPlan) => ({
  type: PLAN_ACTION_TYPES.GET_CURRENT_PLAN_SUCCESS,
  payload: currentPlan,
});
export const getCurrentPlanFailure = (error) => ({
  type: PLAN_ACTION_TYPES.GET_CURRENT_PLAN_FAILURE,
  payload: error,
});
