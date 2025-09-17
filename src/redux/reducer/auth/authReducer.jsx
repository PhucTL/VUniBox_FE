import { AUTH_ACTION_TYPES } from '../../actions/auth/authActionTypes';

const initialState = {
  // User data
  user: null,
  
  // Authentication status
  isAuthenticated: false,
  token: null,
  
  // Loading states
  isLoading: false,
  isLoginLoading: false,
  isRegisterLoading: false,
  isGoogleLoginLoading: false,
  
  // Error states
  error: null,
  loginError: null,
  registerError: null,
  googleLoginError: null,
  
  // Success states
  loginSuccess: false,
  registerSuccess: false,
  googleLoginSuccess: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login cases
    case AUTH_ACTION_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        isLoginLoading: true,
        isLoading: true,
        loginError: null,
        loginSuccess: false
      };
      
    case AUTH_ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isLoginLoading: false,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loginError: null,
        loginSuccess: true,
        error: null
      };
      
    case AUTH_ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isLoginLoading: false,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        loginError: action.payload,
        loginSuccess: false,
        error: action.payload
      };

    // Register cases
    case AUTH_ACTION_TYPES.REGISTER_REQUEST:
      return {
        ...state,
        isRegisterLoading: true,
        isLoading: true,
        registerError: null,
        registerSuccess: false
      };
      
    case AUTH_ACTION_TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterLoading: false,
        isLoading: false,
        registerError: null,
        registerSuccess: true,
        error: null
      };
      
    case AUTH_ACTION_TYPES.REGISTER_FAILURE:
      return {
        ...state,
        isRegisterLoading: false,
        isLoading: false,
        registerError: action.payload,
        registerSuccess: false,
        error: action.payload
      };

    // Google Login cases
    case AUTH_ACTION_TYPES.GOOGLE_LOGIN_REQUEST:
      return {
        ...state,
        isGoogleLoginLoading: true,
        isLoading: true,
        googleLoginError: null,
        googleLoginSuccess: false
      };
      
    case AUTH_ACTION_TYPES.GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        isGoogleLoginLoading: false,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        googleLoginError: null,
        googleLoginSuccess: true,
        error: null
      };
      
    case AUTH_ACTION_TYPES.GOOGLE_LOGIN_FAILURE:
      return {
        ...state,
        isGoogleLoginLoading: false,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        googleLoginError: action.payload,
        googleLoginSuccess: false,
        error: action.payload
      };

    // Logout case
    case AUTH_ACTION_TYPES.LOGOUT:
      return {
        ...initialState // Reset to initial state
      };

    // Token management
    case AUTH_ACTION_TYPES.SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: !!action.payload
      };
      
    case AUTH_ACTION_TYPES.CLEAR_AUTH_TOKEN:
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };

    // User management
    case AUTH_ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };
      
    case AUTH_ACTION_TYPES.CLEAR_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export default authReducer;