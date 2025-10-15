import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginThunk } from "../../redux/thunks/auth";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import GoogleErrorBoundary from "../../components/GoogleErrorBoundary";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get auth state from Redux
  const { 
    isLoginLoading, 
    loginError, 
    loginSuccess,
    isGoogleLoginLoading,
    googleLoginError,
    isAuthenticated,
    user
  } = useSelector(state => state.auth);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(loginThunk({
      email: formData.email,
      password: formData.password
    }));
    
    if (result.success) {
      const userData = result.data?.user;
      
      // Delay navigation to show toast
      setTimeout(() => {
        // Check if user is admin - handle both string and number
        const isAdmin = userData && (userData.role === 1 || userData.role === "1");
        
        if (isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/library");
        }
      }, 1000);
    }
  };

  // Handle Google login success
  const handleGoogleLoginSuccess = (responseData) => {
    // Delay navigation to show toast
    setTimeout(() => {
      const userData = responseData?.user;
      
      // Check if user is admin - handle both string and number
      const isAdmin = userData && (userData.role === 1 || userData.role === "1");
      
      if (isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/library");
      }
    }, 1000);
  };

  // Handle Google login error
  const handleGoogleLoginError = (error) => {
    // Handle error silently or show toast if needed
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if user is admin - handle both string and number
      const isAdmin = user.role === 1 || user.role === "1";
                     
      if (isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/library");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="relative bg-gray-100" style={{ minHeight: "100vh" }}>
      {/* Background */}
      <div className="w-full h-full fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
          alt="background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Nội dung chính */}
      <div className="flex items-center justify-center relative z-1 py-20">
        <div className="w-full max-w-4xl mx-auto bg-gradient-to-b from-blue-400 to-blue-200 rounded-[48px] shadow-xl p-12 flex flex-col items-center relative mt-50">
          
          {/* Header */}
          <div className="flex justify-center mb-8 w-[400px]">
            <h1 className="text-3xl font-bold text-blue-900">Đăng Nhập</h1>
          </div>

          {/* Error Messages */}
          {(loginError || googleLoginError) && (
            <div className="w-[400px] mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {loginError || googleLoginError}
            </div>
          )}

          {/* Success Messages */}
          {loginSuccess && (
            <div className="w-[400px] mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              Đăng nhập thành công! Đang chuyển hướng...
            </div>
          )}

          {/* Form */}
          <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="justify-items-start">
              <label className="block text-blue-900 font-semibold mb-2 text-lg">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-6 py-3 rounded-full text-lg border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập email"
                required
              />
            </div>
            <div className="justify-items-start">
              <label className="block text-blue-900 font-semibold mb-2 text-lg">
                Mật Khẩu*
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-6 py-3 rounded-full text-lg border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập mật khẩu"
                required
              />
              <div className="mt-2 text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-blue-700 hover:text-blue-900 text-sm hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoginLoading}
              className="w-full py-3 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoginLoading ? "Đang xử lý..." : "Đăng Nhập"}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center w-[400px]">
            <p className="text-blue-700">
              Chưa có tài khoản?{" "}
              <Link 
                to="/register" 
                className="text-blue-900 font-semibold hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Google Login Button */}
          <GoogleErrorBoundary>
            <GoogleLoginButton 
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </GoogleErrorBoundary>
        </div>
      </div>
    </div>
  );
}
