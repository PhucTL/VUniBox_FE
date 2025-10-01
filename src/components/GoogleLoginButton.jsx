import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { googleLoginThunk } from '../redux/thunks/auth';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const dispatch = useDispatch();
  const googleButtonRef = useRef(null);

  useEffect(() => {
    const initializeGoogle = () => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      console.log('Google Client ID:', clientId);
      console.log('All env vars:', import.meta.env);
      
      if (!clientId) {
        console.error('VITE_GOOGLE_CLIENT_ID is not defined!');
        return;
      }
      
      if (window.google && googleButtonRef.current) {
        // Suppress Google warnings
        const originalError = console.error;
        const originalWarn = console.warn;
        console.error = (...args) => {
          if (!args[0]?.includes?.('GSI_LOGGER') && !args[0]?.includes?.('Cross-Origin-Opener-Policy')) {
            originalError(...args);
          }
        };
        console.warn = (...args) => {
          if (!args[0]?.includes?.('GSI_LOGGER')) {
            originalWarn(...args);
          }
        };

        window.google.accounts.id.initialize({
          client_id: clientId || "859564462424-a81d1ieeimchlh52a2mcmdriip828ju2.apps.googleusercontent.com",
          callback: handleGoogleResponse
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'outline',
          size: 'large',
          width: 400
        });

        // Restore console after initialization
        setTimeout(() => {
          console.error = originalError;
          console.warn = originalWarn;
        }, 2000);
      }
    };

    if (window.google) {
      initializeGoogle();
    } else {
      const timer = setTimeout(initializeGoogle, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const result = await dispatch(googleLoginThunk(response.credential));
      if (result.success) {
        onSuccess?.(result.data);
      } else {
        onError?.(result.error);
      }
    } catch (error) {
      onError?.(error.message || 'Google đăng nhập thất bại');
    }
  };

  return (
    <div className="w-[400px] mt-6">
      <div ref={googleButtonRef}></div>
    </div>
  );
};

export default GoogleLoginButton;