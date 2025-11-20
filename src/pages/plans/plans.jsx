import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllPlansThunk, subscribePlanThunk } from "../../redux/thunks/plan/planThunks";
import { getUserProfileThunk } from "../../redux/thunks/user/userThunks";
import PlanCard from "../../components/PlanCard";
import Topbar from "../../components/topbar";

export default function Plans() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get auth user info
  const authUser = useSelector((state) => state.auth?.user) || JSON.parse(localStorage.getItem("currentUser") || "null");
  const userId = authUser?.userId || authUser?.id || localStorage.getItem("userId");
  
  // Get plans from Redux store
  const { 
    plans, 
    isGetAllPlansLoading,
    isSubscribePlanLoading 
  } = useSelector(state => state.plan);

  // Get user profile to check current plan
  const { userProfile } = useSelector(state => state.user);

  // Load plans when component mounts
  useEffect(() => {
    dispatch(getAllPlansThunk());
    if (userId) {
      dispatch(getUserProfileThunk(userId));
    }
  }, [dispatch, userId]);

  // Handle plan subscription - Redirect to PayOS
  const handleSubscribe = async (planId) => {
    if (!userId) {
      navigate('/login');
      return;
    }

    console.log('Subscribing to plan:', planId, 'for user:', userId); // Debug log
    
    const result = await dispatch(subscribePlanThunk(planId, userId));
    
    console.log('Subscribe result:', result); // Debug log
    
    if (result.success) {
      if (result.requirePayment) {
        // User will be redirected to PayOS, no need to handle anything here
        console.log('Redirecting to PayOS payment page...');
      } else {
        // Free plan or already subscribed
        dispatch(getUserProfileThunk(userId));
        toast.success('Gói dịch vụ đã được kích hoạt!');
      }
    }
  };

  // Check if plan is current user's plan
  const isCurrentPlan = (planName) => {
    return userProfile?.planName === planName;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16 px-4">
          <div className="inline-block bg-blue-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
            VUniBox
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-3 md:mb-4">
            Các Gói Sử Dụng
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Tham gia ngay các gói ưu đãi để sử dụng tối đa các tính năng của chúng tôi
          </p>
        </div>

        {/* Loading State */}
        {isGetAllPlansLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-blue-600 text-xl">Đang tải các gói dịch vụ...</div>
          </div>
        ) : (
          /* Plans Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <PlanCard
                key={plan.planId}
                plan={plan}
                isCurrentPlan={isCurrentPlan(plan.planName)}
                onSubscribe={handleSubscribe}
                isLoading={isSubscribePlanLoading}
              />
            ))}
          </div>
        )}

        {/* Additional Info Section */}
        <div className="mt-10 md:mt-16 text-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
              Tại sao chọn VUniBox?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left">
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600">Tự động trích dẫn</h4>
                <p className="text-gray-600 text-sm">
                  Hệ thống AI tự động tạo trích dẫn chính xác theo chuẩn APA, MLA, Chicago
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600">Phân loại thông minh</h4>
                <p className="text-gray-600 text-sm">
                  AI phân loại và tổ chức tài liệu một cách thông minh và hiệu quả
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600">Chatbot hỗ trợ</h4>
                <p className="text-gray-600 text-sm">
                  Trợ lý AI giúp bạn tìm hiểu nội dung và trả lời câu hỏi về tài liệu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Câu hỏi thường gặp
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold text-gray-800 mb-2">
                Tôi có thể hủy đăng ký bất cứ lúc nào không?
              </h4>
              <p className="text-gray-600">
                Có, bạn có thể hủy đăng ký bất cứ lúc nào. Gói dịch vụ sẽ tiếp tục hoạt động đến hết chu kỳ thanh toán hiện tại.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold text-gray-800 mb-2">
                Dữ liệu của tôi có được bảo mật không?
              </h4>
              <p className="text-gray-600">
                Chúng tôi cam kết bảo mật tuyệt đối dữ liệu của bạn với mã hóa end-to-end và tuân thủ các tiêu chuẩn bảo mật quốc tế.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold text-gray-800 mb-2">
                Tôi có thể nâng cấp hoặc hạ cấp gói bất cứ lúc nào không?
              </h4>
              <p className="text-gray-600">
                Có, bạn có thể thay đổi gói dịch vụ bất cứ lúc nào. Sự thay đổi sẽ có hiệu lực ngay lập tức.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}