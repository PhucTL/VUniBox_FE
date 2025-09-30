// User Action Creators
import { USER_ACTION_TYPES } from './userActionTypes';

// Get User Profile Actions
export const getUserProfileRequest = () => ({
  type: USER_ACTION_TYPES.GET_USER_PROFILE_REQUEST,
});
export const getUserProfileSuccess = (userProfile) => ({
  type: USER_ACTION_TYPES.GET_USER_PROFILE_SUCCESS,
  payload: userProfile,
});
export const getUserProfileFailure = (error) => ({
  type: USER_ACTION_TYPES.GET_USER_PROFILE_FAILURE,
  payload: error,
});

// Get User Storage Actions
export const getUserStorageRequest = () => ({
  type: USER_ACTION_TYPES.GET_USER_STORAGE_REQUEST,
});
export const getUserStorageSuccess = (storageInfo) => ({
  type: USER_ACTION_TYPES.GET_USER_STORAGE_SUCCESS,
  payload: storageInfo,
});
export const getUserStorageFailure = (error) => ({
  type: USER_ACTION_TYPES.GET_USER_STORAGE_FAILURE,
  payload: error,
});

// Update Profile Actions
export const updateProfileRequest = () => ({
  type: USER_ACTION_TYPES.UPDATE_PROFILE_REQUEST,
});
export const updateProfileSuccess = (updatedProfile) => ({
  type: USER_ACTION_TYPES.UPDATE_PROFILE_SUCCESS,
  payload: updatedProfile,
});
export const updateProfileFailure = (error) => ({
  type: USER_ACTION_TYPES.UPDATE_PROFILE_FAILURE,
  payload: error,
});

// Upload Avatar Actions
export const uploadAvatarRequest = () => ({
  type: USER_ACTION_TYPES.UPLOAD_AVATAR_REQUEST,
});
export const uploadAvatarSuccess = (avatarUrl) => ({
  type: USER_ACTION_TYPES.UPLOAD_AVATAR_SUCCESS,
  payload: avatarUrl,
});
export const uploadAvatarFailure = (error) => ({
  type: USER_ACTION_TYPES.UPLOAD_AVATAR_FAILURE,
  payload: error,
});