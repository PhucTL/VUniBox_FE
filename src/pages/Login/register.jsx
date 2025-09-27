import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerThunk } from "../../redux/thunks/auth";
import { toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get auth state from Redux
  const { 
    isRegisterLoading, 
    registerError, 
    registerSuccess,
    isAuthenticated 
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
    
    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }
    
    const result = await dispatch(registerThunk({
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    }));
    
    if (result.success) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/library");
    }
  }, [isAuthenticated, navigate]);

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
            <h1 className="text-3xl font-bold text-blue-900">Đăng Ký</h1>
          </div>

          {/* Error Messages */}
          {registerError && (
            <div className="w-[400px] mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {registerError}
            </div>
          )}

          {/* Success Messages */}
          {registerSuccess && (
            <div className="w-[400px] mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              Đăng ký thành công! Vui lòng đăng nhập.
            </div>
          )}

          {/* Form */}
          <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="justify-items-start">
              <label className="block text-blue-900 font-semibold mb-2 text-lg">
                Họ và Tên*
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-6 py-3 rounded-full text-lg border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            
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
                Số Điện Thoại*
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-6 py-3 rounded-full text-lg border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập số điện thoại"
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
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                minLength="6"
                required
              />
            </div>

            <div className="justify-items-start">
              <label className="block text-blue-900 font-semibold mb-2 text-lg">
                Xác Nhận Mật Khẩu*
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-6 py-3 rounded-full text-lg border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập lại mật khẩu"
                minLength="6"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isRegisterLoading}
              className="w-full py-3 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRegisterLoading ? "Đang xử lý..." : "Đăng Ký"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center w-[400px]">
            <p className="text-blue-700">
              Đã có tài khoản?{" "}
              <Link 
                to="/login" 
                className="text-blue-900 font-semibold hover:underline"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>

          {/* Google register */}
          <button className="w-[400px] mt-6 py-3 rounded-full border-2 border-blue-300 flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-blue-700 font-medium text-lg transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path
                d="M21.35 11.1h-9.17v2.92h5.24c-.23 1.24-1.4 3.65-5.24 3.65-3.15 0-5.72-2.61-5.72-5.82s2.57-5.82 5.72-5.82c1.8 0 3.01.77 3.7 1.43l2.53-2.47C16.4 3.97 14.54 3 12.18 3 6.97 3 2.82 7.13 2.82 12.01s4.15 9.01 9.36 9.01c5.39 0 8.96-3.79 8.96-9.13 0-.61-.07-1.09-.17-1.79z"
                fill="#4285F4"
              />
            </svg>
            Đăng ký với Google
          </button>
        </div>
      </div>
    </div>
  );
}
