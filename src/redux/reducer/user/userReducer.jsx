import { USER_ACTION_TYPES } from '../../actions/user/userActionTypes';

const initialState = {
  // User Profile Data
  userProfile: null,
  storageInfo: null,
  
  // Loading States
  isLoading: false,
  isGetProfileLoading: false,
  isGetStorageLoading: false,
  isUpdateProfileLoading: false,
  isUploadAvatarLoading: false,
  
  // Success States
  getProfileSuccess: false,
  getStorageSuccess: false,
  updateProfileSuccess: false,
  uploadAvatarSuccess: false,
  
  // Error States
  error: null,
  getProfileError: null,
  getStorageError: null,
  updateProfileError: null,
  uploadAvatarError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET USER PROFILE Cases
    case USER_ACTION_TYPES.GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        isGetProfileLoading: true,
        isLoading: true,
        getProfileError: null,
        getProfileSuccess: false,
      };
    case USER_ACTION_TYPES.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isGetProfileLoading: false,
        isLoading: false,
        userProfile: action.payload,
        getProfileError: null,
        getProfileSuccess: true,
        error: null,
      };
    case USER_ACTION_TYPES.GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        isGetProfileLoading: false,
        isLoading: false,
        getProfileError: action.payload,
        getProfileSuccess: false,
        error: action.payload,
      };

    // GET USER STORAGE Cases
    case USER_ACTION_TYPES.GET_USER_STORAGE_REQUEST:
      return {
        ...state,
        isGetStorageLoading: true,
        isLoading: true,
        getStorageError: null,
        getStorageSuccess: false,
      };
    case USER_ACTION_TYPES.GET_USER_STORAGE_SUCCESS:
      return {
        ...state,
        isGetStorageLoading: false,
        isLoading: false,
        storageInfo: action.payload,
        getStorageError: null,
        getStorageSuccess: true,
        error: null,
      };
    case USER_ACTION_TYPES.GET_USER_STORAGE_FAILURE:
      return {
        ...state,
        isGetStorageLoading: false,
        isLoading: false,
        getStorageError: action.payload,
        getStorageSuccess: false,
        error: action.payload,
      };

    // UPDATE PROFILE Cases
    case USER_ACTION_TYPES.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isUpdateProfileLoading: true,
        isLoading: true,
        updateProfileError: null,
        updateProfileSuccess: false,
      };
    case USER_ACTION_TYPES.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isUpdateProfileLoading: false,
        isLoading: false,
        userProfile: { ...state.userProfile, ...action.payload },
        updateProfileError: null,
        updateProfileSuccess: true,
        error: null,
      };
    case USER_ACTION_TYPES.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isUpdateProfileLoading: false,
        isLoading: false,
        updateProfileError: action.payload,
        updateProfileSuccess: false,
        error: action.payload,
      };

    // UPLOAD AVATAR Cases
    case USER_ACTION_TYPES.UPLOAD_AVATAR_REQUEST:
      return {
        ...state,
        isUploadAvatarLoading: true,
        isLoading: true,
        uploadAvatarError: null,
        uploadAvatarSuccess: false,
      };
    case USER_ACTION_TYPES.UPLOAD_AVATAR_SUCCESS:
      return {
        ...state,
        isUploadAvatarLoading: false,
        isLoading: false,
        userProfile: { ...state.userProfile, avatarUrl: action.payload },
        uploadAvatarError: null,
        uploadAvatarSuccess: true,
        error: null,
      };
    case USER_ACTION_TYPES.UPLOAD_AVATAR_FAILURE:
      return {
        ...state,
        isUploadAvatarLoading: false,
        isLoading: false,
        uploadAvatarError: action.payload,
        uploadAvatarSuccess: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;