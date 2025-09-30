import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { checkPaymentStatusThunk } from "../../redux/thunks/plan/planThunks";
import { getUserProfileThunk } from "../../redux/thunks/user/userThunks";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);
  
  // Get URL parameters
  const code = searchParams.get('code');
  const orderCode = searchParams.get('orderCode') || searchParams.get('id'); // PayOS có thể dùng 'id'
  const status = searchParams.get('status');
  const cancel = searchParams.get('cancel');

  useEffect(() => {
    const verifyPayment = async () => {
      // Get stored order info
      const storedOrderCode = localStorage.getItem('pendingOrderCode');
      const storedUserId = localStorage.getItem('pendingUserId');
      const storedPlanId = localStorage.getItem('pendingPlanId');
      
      const finalOrderCode = orderCode || storedOrderCode;
      
      if (!finalOrderCode) {
        setVerificationResult({
          success: false,
          message: "Không tìm thấy thông tin đơn hàng"
        });
        setIsVerifying(false);
        return;
      }

      try {
        // Check if payment was successful based on URL params
        if (code === '00' && status === 'PAID' && cancel === 'false') {
          // Verify with backend
          const result = await dispatch(checkPaymentStatusThunk(finalOrderCode));
          
          if (result.success && result.isPaid) {
            setVerificationResult({
              success: true,
              message: "Thanh toán thành công! Gói dịch vụ đã được kích hoạt."
            });
            
            // Refresh user profile
            if (storedUserId) {
              await dispatch(getUserProfileThunk(storedUserId));
            }
            
            // Clear stored data
            localStorage.removeItem('pendingOrderCode');
            localStorage.removeItem('pendingUserId');
            localStorage.removeItem('pendingPlanId');
            
            // Redirect to account page after 3 seconds
            setTimeout(() => {
              navigate('/account');
            }, 3000);
            
          } else {
            setVerificationResult({
              success: false,
              message: result.message || "Không thể xác minh thanh toán"
            });
          }
        } else {
          // Payment was cancelled or failed
          setVerificationResult({
            success: false,
            message: cancel === 'true' ? 
              "Thanh toán đã bị hủy" : 
              "Thanh toán thất bại"
          });
        }
      } catch (error) {
        setVerificationResult({
          success: false,
          message: "Có lỗi xảy ra khi xác minh thanh toán"
        });
      }
      
      setIsVerifying(false);
    };

    verifyPayment();
  }, [orderCode, code, status, cancel, dispatch, navigate]);

  // Show toast notification
  useEffect(() => {
    if (verificationResult) {
      if (verificationResult.success) {
        toast.success(verificationResult.message);
      } else {
        toast.error(verificationResult.message);
      }
    }
  }, [verificationResult]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        {isVerifying ? (
          // Verifying state
          <div className="space-y-6">
            <FaSpinner className="text-6xl text-blue-500 mx-auto animate-spin" />
            <h1 className="text-2xl font-bold text-gray-800">
              Đang xác minh thanh toán...
            </h1>
            <p className="text-gray-600">
              Vui lòng chờ trong giây lát
            </p>
          </div>
        ) : verificationResult?.success ? (
          // Success state
          <div className="space-y-6">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto" />
            <h1 className="text-2xl font-bold text-green-600">
              Thanh toán thành công!
            </h1>
            <p className="text-gray-600">
              {verificationResult.message}
            </p>
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                Đang chuyển hướng đến trang tài khoản...
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => navigate('/account')}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  Xem tài khoản
                </button>
                <button
                  onClick={() => navigate('/plans')}
                  className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                >
                  Xem gói dịch vụ
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Error state
          <div className="space-y-6">
            <FaTimesCircle className="text-6xl text-red-500 mx-auto" />
            <h1 className="text-2xl font-bold text-red-600">
              Thanh toán thất bại
            </h1>
            <p className="text-gray-600">
              {verificationResult?.message || "Có lỗi xảy ra trong quá trình thanh toán"}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/plans')}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200"
              >
                Thử lại
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        )}
        
        {/* Debug info (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left text-xs">
            <p><strong>Debug Info:</strong></p>
            <p>Order Code: {orderCode}</p>
            <p>Status: {status}</p>
            <p>Code: {code}</p>
            <p>Cancel: {cancel}</p>
          </div>
        )}
      </div>
    </div>
  );
}