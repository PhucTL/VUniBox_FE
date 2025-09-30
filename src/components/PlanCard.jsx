import React from 'react';
import { FaCheck } from 'react-icons/fa';

const PlanCard = ({ plan, isCurrentPlan, onSubscribe, isLoading }) => {
  const isFreePlan = plan.planName === 'FREE';
  
  return (
    <div className={`relative bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300`}>
      
      {/* Plan Name */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{plan.planName}</h3>
        <div className="text-4xl font-bold">
          {isFreePlan ? '0VND' : `${plan.price.toLocaleString('vi-VN')}VND`}
          <span className="text-lg font-normal">
            {!isFreePlan && '/tháng'}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/30 mb-6"></div>

      {/* Features Section */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4">Bao gồm:</h4>
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <FaCheck className="text-white mt-1 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        {isCurrentPlan ? (
          <div className="bg-white/20 text-white py-3 px-6 rounded-full font-semibold">
            Gói hiện tại
          </div>
        ) : isFreePlan ? (
          <button
            onClick={() => onSubscribe(plan.planId)}
            disabled={isLoading}
            className="w-full bg-white text-blue-600 py-3 px-6 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Đang xử lý...' : 'Gói hiện tại'}
          </button>
        ) : (
          <button
            onClick={() => onSubscribe(plan.planId)}
            disabled={isLoading}
            className="w-full bg-white text-blue-600 py-3 px-6 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Đang xử lý...' : 'Thanh toán ngay'}
          </button>
        )}
      </div>

      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
          Phổ biến nhất
        </div>
      )}

      {/* Recommended Badge */}
      {plan.isRecommended && (
        <div className="absolute -top-4 right-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-xs font-semibold">
          Khuyến nghị
        </div>
      )}
    </div>
  );
};

export default PlanCard;