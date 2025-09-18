import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLoginThunk } from '../redux/thunks/auth';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const dispatch = useDispatch();
  const { isGoogleLoginLoading } = useSelector(state => state.auth);
  const googleButtonRef = useRef(null);

  useEffect(() => {
    const initializeGoogle = () => {
      if (window.google?.accounts && googleButtonRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleGoogleCallback,
          });

          window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            width: 400,
            logo_alignment: 'left'
          });
        } catch (error) {
          console.log('Google init error:', error);
        }
      }
    };

    const timer = setTimeout(initializeGoogle, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleGoogleCallback = async (response) => {
    try {
      const result = await dispatch(googleLoginThunk(response.credential));
      if (result.success) {
        onSuccess?.(result.data);
      } else {
        onError?.(result.error);
      }
    } catch (error) {
      onError?.(error);
    }
  };

  if (isGoogleLoginLoading) {
    return (
      <div className="w-[400px] mt-6">
        <div className="w-full py-3 rounded-full border-2 border-blue-300 flex items-center justify-center gap-3 bg-gray-100 text-gray-500 font-medium text-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          Đang đăng nhập với Google...
        </div>
      </div>
    );
  }

  return (
    <div className="w-[400px] mt-6">
      <div ref={googleButtonRef} className="google-signin-button"></div>
    </div>
  );
};

export default GoogleLoginButton;