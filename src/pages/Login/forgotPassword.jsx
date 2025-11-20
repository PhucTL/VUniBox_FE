import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { forgotPasswordVerifyThunk, forgotPasswordResetThunk, forgotPasswordCombinedThunk } from "../../redux/thunks/auth";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Verify, 2: Reset Password  
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    newPassword: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get auth state from Redux
  const { 
    isForgotPasswordVerifyLoading,
    isForgotPasswordResetLoading,
    forgotPasswordVerifyError,
    forgotPasswordResetError,
    isVerified,
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

  // Handle verify form submission (Step 1)
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    
    // Call verify API only
    const result = await dispatch(forgotPasswordVerifyThunk({
      email: formData.email,
      phoneNumber: formData.phoneNumber
    }));
    
    if (result.success) {
      // Clear any previous reset errors
      dispatch({ type: 'CLEAR_RESET_ERROR' });
      setStep(2); // Move to step 2 only after verify success
    }
  };

  // Handle reset password form submission (Step 2)
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password fields only
    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error("Vui lòng điền đầy đủ mật khẩu!");
      return;
    }
    
    // Validate password confirmation
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Validate password length
    if (formData.newPassword.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }
    
    // Try combined approach - verify again just before reset
    const result = await dispatch(forgotPasswordCombinedThunk(
      {
        email: formData.email,
        phoneNumber: formData.phoneNumber
      },
      {
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      }
    ));
    
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

  // Initialize and cleanup session data
  useEffect(() => {
    // Clear any existing session data when component mounts (fresh start)
    localStorage.removeItem('forgotPasswordSession');
    setStep(1); // Always start from step 1
    
    return () => {
      // Cleanup session data if user navigates away
      localStorage.removeItem('forgotPasswordSession');
    };
  }, []);

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

      {/* Main Content */}
      <div className="flex items-center justify-center relative z-1 py-10 md:py-20 px-4">
        <div className="w-full max-w-md md:max-w-4xl mx-auto bg-gradient-to-b from-blue-400 to-blue-200 rounded-3xl md:rounded-[48px] shadow-xl p-6 md:p-12 flex flex-col items-center relative mt-20 md:mt-50">
          
          {/* Header */}
          <div className="flex justify-center mb-6 md:mb-8 w-full max-w-[400px]">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 text-center">
              {step === 1 ? "Quên Mật Khẩu" : "Đặt Mật Khẩu Mới"}
            </h1>
          </div>

          {/* Step 1: Verify Email and Phone */}
          {step === 1 && (
            <>
              {/* Error Messages */}
              {forgotPasswordVerifyError && (
                <div className="w-full max-w-[400px] mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm md:text-base">
                  {forgotPasswordVerifyError}
                </div>
              )}

              {/* Form */}
              <form className="w-full max-w-[400px] flex flex-col gap-4 md:gap-6" onSubmit={handleVerifySubmit}>
                <div className="justify-items-start">
                  <label className="block text-blue-900 font-semibold mb-2 text-base md:text-lg">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 md:px-6 py-2 md:py-3 rounded-full text-base md:text-lg border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Nhập email của bạn"
                    required
                  />
                </div>

                <div className="justify-items-start">
                  <label className="block text-blue-900 font-semibold mb-2 text-base md:text-lg">
                    Số Điện Thoại*
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 md:px-6 py-2 md:py-3 rounded-full text-base md:text-lg border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Nhập số điện thoại của bạn"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2 md:py-3 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base md:text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition"
                >
                  Tiếp Theo
                </button>
              </form>
            </>
          )}

          {/* Step 2: Reset Password */}
          {step === 2 && (
            <>
              {/* Only show reset errors if user has actually tried to submit */}
              {forgotPasswordResetError && formData.newPassword && (
                <div className="w-[400px] mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {forgotPasswordResetError}
                </div>
              )}

              {/* Success Message */}
              <div className="w-[400px] mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                Xác thực thành công! Vui lòng nhập mật khẩu mới.
              </div>

              {/* Summary of Step 1 */}
              <div className="w-[400px] mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Email:</strong> {formData.email}<br/>
                  <strong>Số điện thoại:</strong> {formData.phoneNumber}
                </p>
                <button 
                  onClick={() => setStep(1)} 
                  className="text-blue-600 text-sm hover:underline mt-2"
                >
                  Thay đổi thông tin
                </button>
              </div>

              {/* Form */}
              <form className="w-[400px] flex flex-col gap-6" onSubmit={handleResetSubmit}>
                <div className="justify-items-start">
                  <label className="block text-blue-900 font-semibold mb-2 text-lg">
                    Mật Khẩu Mới*
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full px-6 py-3 rounded-full text-lg border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
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
                    placeholder="Nhập lại mật khẩu mới"
                    minLength="6"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isForgotPasswordResetLoading}
                  className="w-full py-3 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isForgotPasswordResetLoading ? "Đang xử lý..." : "Đặt Lại Mật Khẩu"}
                </button>
              </form>
            </>
          )}

          {/* Back to Login Link */}
          <div className="mt-6 text-center w-[400px]">
            <p className="text-blue-700">
              Nhớ lại mật khẩu?{" "}
              <Link 
                to="/login" 
                className="text-blue-900 font-semibold hover:underline"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mt-6 flex justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-blue-600' : 'bg-blue-300'}`}></div>
            <div className={`w-3 h-3 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-blue-300'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}