import userService from '../../services/user/userService';
import { toast } from 'react-toastify';
import {
  getUserProfileRequest, getUserProfileSuccess, getUserProfileFailure,
  getUserStorageRequest, getUserStorageSuccess, getUserStorageFailure,
  updateProfileRequest, updateProfileSuccess, updateProfileFailure,
  uploadAvatarRequest, uploadAvatarSuccess, uploadAvatarFailure
} from '../../actions/user/userActions';

// Lấy thông tin profile của user
export const getUserProfileThunk = (userId) => async (dispatch) => {
  try {
    dispatch(getUserProfileRequest());
    const result = await userService.getUserProfile(userId);
    dispatch(getUserProfileSuccess(result.userProfile));
    return { success: true, data: result.userProfile };
  } catch (error) {
    dispatch(getUserProfileFailure(error));
    toast.error(error.message || 'Lấy thông tin profile thất bại!');
    return { success: false, error: error.message || 'Lấy thông tin profile thất bại!' };
  }
};

// Lấy thông tin storage của user
export const getUserStorageThunk = (userId) => async (dispatch) => {
  try {
    dispatch(getUserStorageRequest());
    const result = await userService.getUserStorage(userId);
    dispatch(getUserStorageSuccess(result));
    return { success: true, data: result };
  } catch (error) {
    dispatch(getUserStorageFailure(error));
    toast.error(error.message || 'Lấy thông tin storage thất bại!');
    return { success: false, error: error.message || 'Lấy thông tin storage thất bại!' };
  }
};

// Cập nhật thông tin profile
export const updateProfileThunk = (userId, profileData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    const result = await userService.updateProfile(userId, profileData);
    dispatch(updateProfileSuccess(result));
    toast.success('Cập nhật thông tin thành công!');
    return { success: true, data: result };
  } catch (error) {
    dispatch(updateProfileFailure(error));
    toast.error(error.message || 'Cập nhật thông tin thất bại!');
    return { success: false, error: error.message || 'Cập nhật thông tin thất bại!' };
  }
};

// Upload avatar
export const uploadAvatarThunk = (userId, file) => async (dispatch) => {
  try {
    dispatch(uploadAvatarRequest());
    const result = await userService.uploadAvatar(userId, file);
    dispatch(uploadAvatarSuccess(result.avatarUrl));
    toast.success('Upload avatar thành công!');
    return { success: true, data: result };
  } catch (error) {
    dispatch(uploadAvatarFailure(error));
    toast.error(error.message || 'Upload avatar thất bại!');
    return { success: false, error: error.message || 'Upload avatar thất bại!' };
  }
};

// Delete avatar
export const deleteAvatarThunk = (userId) => async (dispatch) => {
  try {
    dispatch(uploadAvatarRequest()); // Reuse same loading state
    const result = await userService.deleteAvatar(userId);
    dispatch(uploadAvatarSuccess(null)); // Clear avatar
    toast.success('Xóa avatar thành công!');
    return { success: true, data: result };
  } catch (error) {
    dispatch(uploadAvatarFailure(error));
    toast.error(error.message || 'Xóa avatar thất bại!');
    return { success: false, error: error.message || 'Xóa avatar thất bại!' };
  }
};