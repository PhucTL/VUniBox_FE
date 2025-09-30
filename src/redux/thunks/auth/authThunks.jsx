import authService from '../../services/Auth/loginService';
import googleAuthService from '../../services/Auth/googleAuthService';
import forgotPasswordService from '../../services/Auth/forgotPasswordService';
import { toast } from 'react-toastify';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  googleLoginRequest,
  googleLoginSuccess,
  googleLoginFailure,
  forgotPasswordVerifyRequest,
  forgotPasswordVerifySuccess,
  forgotPasswordVerifyFailure,
  forgotPasswordResetRequest,
  forgotPasswordResetSuccess,
  forgotPasswordResetFailure,
  logout as logoutAction,
  setAuthToken,
  clearAuthToken,
  setUser,
  clearUser
} from '../../actions/auth/authActions';

// Login Thunk
export const loginThunk = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const response = await authService.login(credentials);
      const { access_token, refresh_token, user } = response;
      
      dispatch(setAuthToken(access_token));
      dispatch(setUser(user));
      dispatch(loginSuccess(user, access_token));
      
      toast.success(`Chào mừng ${user.fullName || user.email}! Đăng nhập thành công.`);
      return { success: true, data: response };
    } catch (error) {
      dispatch(loginFailure(error.message || 'Đăng nhập thất bại'));
      toast.error(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
      return { success: false, error: error.message || 'Đăng nhập thất bại' };
    }
  };
};

// Register Thunk
export const registerThunk = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(registerRequest());
      const response = await authService.register(userData);
      
      dispatch(registerSuccess(response.user || userData));
      toast.success('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
      return { success: true, data: response };
    } catch (error) {
      dispatch(registerFailure(error.message || 'Đăng ký thất bại'));
      toast.error(error.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      return { success: false, error: error.message || 'Đăng ký thất bại' };
    }
  };
};

// Google Login Thunk
export const googleLoginThunk = (idToken) => {
  return async (dispatch) => {
    try {
      dispatch(googleLoginRequest());
      const response = await googleAuthService.googleLogin(idToken);
      
      dispatch(setAuthToken(response.access_token));
      dispatch(setUser(response.user));
      dispatch(googleLoginSuccess(response.user, response.access_token));
      
      // Show success toast for Google login
      toast.success(`Chào mừng ${response.user.fullName || response.user.email}! Đăng nhập Google thành công.`, {
        position: "top-right",
        autoClose: 3000,
      });
      
      return { success: true, data: response };
    } catch (error) {
      dispatch(googleLoginFailure(error.message || 'Google đăng nhập thất bại'));
      
      // Show error toast for Google login
      toast.error(error.message || 'Google đăng nhập thất bại. Vui lòng thử lại.', {
        position: "top-right",
        autoClose: 3000,
      });
      
      return { success: false, error: error.message || 'Google đăng nhập thất bại' };
    }
  };
};

// Logout Thunk
export const logoutThunk = () => {
  return (dispatch) => {
    try {
      authService.logout();
      
      // Google cleanup
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.disableAutoSelect();
          window.google.accounts.id.cancel();
        } catch (googleError) {
          console.log('Google cleanup warning:', googleError);
        }
      }
      
      dispatch(clearAuthToken());
      dispatch(clearUser());
      dispatch(logoutAction());
      
      toast.info('Đã đăng xuất thành công. Hẹn gặp lại!');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      
      try {
        authService.logout();
        dispatch(clearAuthToken());
        dispatch(clearUser());
        dispatch(logoutAction());
      } catch (cleanupError) {
        console.log('Cleanup error:', cleanupError);
      }
      
      toast.info('Đã đăng xuất thành công. Hẹn gặp lại!');
      return { success: true };
    }
  };
};

// Check Authentication Status Thunk
export const checkAuthThunk = () => {
  return (dispatch) => {
    try {
      const token = authService.getToken();
      
      if (token && authService.isAuthenticated()) {
        dispatch(setAuthToken(token));
        return { success: true, authenticated: true };
      } else {
        dispatch(clearAuthToken());
        dispatch(clearUser());
        return { success: true, authenticated: false };
      }
    } catch (error) {
      dispatch(clearAuthToken());
      dispatch(clearUser());
      return { success: false, error: error.message };
    }
  };
};

// Forgot Password Verify Thunk
export const forgotPasswordVerifyThunk = (verifyData) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPasswordVerifyRequest());
      const response = await authService.forgotPasswordVerify(verifyData);
      
      dispatch(forgotPasswordVerifySuccess(response.data));
      toast.success('Xác thực thành công! Bạn có thể đặt lại mật khẩu mới.');
      return { success: true, data: response };
    } catch (error) {
      dispatch(forgotPasswordVerifyFailure(error.message || 'Xác thực thất bại'));
      toast.error(error.message || 'Xác thực thất bại. Vui lòng kiểm tra email và số điện thoại.');
      return { success: false, error: error.message || 'Xác thực thất bại' };
    }
  };
};

// Forgot Password Reset Thunk
export const forgotPasswordResetThunk = (resetData) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPasswordResetRequest());
      const response = await authService.forgotPasswordReset(resetData);
      
      dispatch(forgotPasswordResetSuccess(response.data));
      toast.success('Đặt lại mật khẩu thành công! Bạn có thể đăng nhập với mật khẩu mới.');
      return { success: true, data: response };
    } catch (error) {
      dispatch(forgotPasswordResetFailure(error.message || 'Đặt lại mật khẩu thất bại'));
      toast.error(error.message || 'Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
      return { success: false, error: error.message || 'Đặt lại mật khẩu thất bại' };
    }
  };
};

// Combined Forgot Password Thunk (Verify + Reset in one flow)
export const forgotPasswordCombinedThunk = (verifyData, resetData) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPasswordVerifyRequest()); // Start with verify loading
      
      const response = await forgotPasswordService.verifyAndReset(verifyData, resetData);
      
      dispatch(forgotPasswordResetSuccess(response.data));
      toast.success('Đặt lại mật khẩu thành công! Bạn có thể đăng nhập với mật khẩu mới.');
      return { success: true, data: response };
    } catch (error) {
      // Check if error is from verify step or reset step
      if (error.message?.includes('xác thực')) {
        dispatch(forgotPasswordVerifyFailure(error.message || 'Xác thực thất bại'));
      } else {
        dispatch(forgotPasswordResetFailure(error.message || 'Đặt lại mật khẩu thất bại'));
      }
      toast.error(error.message || 'Quá trình đặt lại mật khẩu thất bại. Vui lòng thử lại.');
      return { success: false, error: error.message || 'Đặt lại mật khẩu thất bại' };
    }
  };
};