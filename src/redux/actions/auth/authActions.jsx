import { AUTH_ACTION_TYPES } from './authActionTypes';

// Login Action Creators
export const loginRequest = () => ({
  type: AUTH_ACTION_TYPES.LOGIN_REQUEST
});

export const loginSuccess = (user, token) => ({
  type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
  payload: { user, token }
});

export const loginFailure = (error) => ({
  type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
  payload: error
});

// Register Action Creators
export const registerRequest = () => ({
  type: AUTH_ACTION_TYPES.REGISTER_REQUEST
});

export const registerSuccess = (user) => ({
  type: AUTH_ACTION_TYPES.REGISTER_SUCCESS,
  payload: user
});

export const registerFailure = (error) => ({
  type: AUTH_ACTION_TYPES.REGISTER_FAILURE,
  payload: error
});

// Google Login Action Creators
export const googleLoginRequest = () => ({
  type: AUTH_ACTION_TYPES.GOOGLE_LOGIN_REQUEST
});

export const googleLoginSuccess = (user, token) => ({
  type: AUTH_ACTION_TYPES.GOOGLE_LOGIN_SUCCESS,
  payload: { user, token }
});

export const googleLoginFailure = (error) => ({
  type: AUTH_ACTION_TYPES.GOOGLE_LOGIN_FAILURE,
  payload: error
});

// Forgot Password Verify Actions
export const forgotPasswordVerifyRequest = () => ({
  type: AUTH_ACTION_TYPES.FORGOT_PASSWORD_VERIFY_REQUEST
});

export const forgotPasswordVerifySuccess = (data) => ({
  type: AUTH_ACTION_TYPES.FORGOT_PASSWORD_VERIFY_SUCCESS,
  payload: data
});

export const forgotPasswordVerifyFailure = (error) => ({
  type: AUTH_ACTION_TYPES.FORGOT_PASSWORD_VERIFY_FAILURE,
  payload: error
});

// Forgot Password Reset Actions
export const forgotPasswordResetRequest = () => ({
  type: AUTH_ACTION_TYPES.FORGOT_PASSWORD_RESET_REQUEST
});

export const forgotPasswordResetSuccess = (data) => ({
  type: AUTH_ACTION_TYPES.FORGOT_PASSWORD_RESET_SUCCESS,
  payload: data
});

export const forgotPasswordResetFailure = (error) => ({
  type: AUTH_ACTION_TYPES.FORGOT_PASSWORD_RESET_FAILURE,
  payload: error
});

// Logout Action Creator
export const logout = () => ({
  type: AUTH_ACTION_TYPES.LOGOUT
});

// Token Management Action Creators
export const setAuthToken = (token) => ({
  type: AUTH_ACTION_TYPES.SET_AUTH_TOKEN,
  payload: token
});

export const clearAuthToken = () => ({
  type: AUTH_ACTION_TYPES.CLEAR_AUTH_TOKEN
});

// User Management Action Creators
export const setUser = (user) => ({
  type: AUTH_ACTION_TYPES.SET_USER,
  payload: user
});

export const clearUser = () => ({
  type: AUTH_ACTION_TYPES.CLEAR_USER
});