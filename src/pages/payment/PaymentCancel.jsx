import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTimesCircle, FaArrowLeft, FaCreditCard } from "react-icons/fa";

export default function PaymentCancel() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get URL parameters
  const code = searchParams.get('code');
  const orderCode = searchParams.get('orderCode') || searchParams.get('id');
  const status = searchParams.get('status');
  const cancel = searchParams.get('cancel');

  useEffect(() => {
    // Clear any stored payment data
    localStorage.removeItem('pendingOrderCode');
    localStorage.removeItem('pendingUserId');
    localStorage.removeItem('pendingPlanId');
    
    // Show notification
    toast.warning("Thanh toán đã bị hủy");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="space-y-6">
          <FaTimesCircle className="text-6xl text-orange-500 mx-auto" />
          
          <h1 className="text-2xl font-bold text-orange-600">
            Thanh toán đã bị hủy
          </h1>
          
          <p className="text-gray-600">
            Bạn đã hủy quá trình thanh toán. Đơn hàng của bạn chưa được xử lý.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/plans')}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <FaCreditCard className="text-lg" />
              <span>Thử thanh toán lại</span>
            </button>
            
            <button
              onClick={() => navigate('/account')}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <FaArrowLeft className="text-lg" />
              <span>Về trang tài khoản</span>
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full text-gray-500 py-2 hover:text-gray-700 transition-colors duration-200"
            >
              Về trang chủ
            </button>
          </div>
        </div>
        
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