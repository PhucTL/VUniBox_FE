import React from 'react';
import { FaClock, FaCalendarAlt, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const SubscriptionCard = ({ subscriptionData }) => {
  if (!subscriptionData) return null;

  const { currentPlan, expiryDate, isActive, daysRemaining } = subscriptionData;
  
  // Format expiry date
  const formatExpiryDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Determine status color and icon
  const getStatusColor = () => {
    // Use daysRemaining as primary indicator
    if (daysRemaining <= 0) return 'text-red-500';
    if (daysRemaining <= 7) return 'text-orange-500';
    if (daysRemaining <= 30) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStatusIcon = () => {
    if (daysRemaining <= 0) return <FaExclamationTriangle className="text-red-500" />;
    if (daysRemaining <= 7) return <FaExclamationTriangle className="text-orange-500" />;
    return <FaCheckCircle className="text-green-500" />;
  };

  const getStatusText = () => {
    if (daysRemaining <= 0) return 'Đã hết hạn';
    if (daysRemaining === 1) return 'Còn 1 ngày';
    return `Còn ${daysRemaining} ngày`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Thông tin gói dịch vụ</h3>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Plan Info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-900">{currentPlan?.planName}</h4>
              <p className="text-blue-700 text-sm">{currentPlan?.priceDisplay}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600">Dung lượng</p>
              <p className="font-semibold text-blue-900">{currentPlan?.storageDisplay}</p>
            </div>
          </div>
        </div>

        {/* Expiry Date */}
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <FaCalendarAlt className="text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Ngày hết hạn</p>
            <p className="font-medium text-gray-800">
              {formatExpiryDate(expiryDate)}
            </p>
          </div>
        </div>

        {/* Days Remaining */}
        {isActive && (
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <FaClock className={getStatusColor().replace('text-', 'text-')} />
            <div>
              <p className="text-sm text-gray-600">Thời gian còn lại</p>
              <p className={`font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </p>
            </div>
          </div>
        )}

        {/* Features */}
        {currentPlan && (
          <div className="space-y-2">
            <h5 className="font-medium text-gray-700">Giới hạn gói:</h5>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Trích dẫn:</span>
                <span className="font-medium">{currentPlan.citationLimit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chatbot:</span>
                <span className="font-medium">{currentPlan.chatbotLimit}</span>
              </div>
            </div>
          </div>
        )}

        {/* Warning for expiring soon */}
        {daysRemaining > 0 && daysRemaining <= 7 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <FaExclamationTriangle className="text-orange-500" />
              <p className="text-orange-700 text-sm">
                Gói dịch vụ sắp hết hạn! Hãy gia hạn để tiếp tục sử dụng.
              </p>
            </div>
          </div>
        )}

        {/* Expired message */}
        {daysRemaining <= 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <FaExclamationTriangle className="text-red-500" />
              <p className="text-red-700 text-sm">
                Gói dịch vụ đã hết hạn. Vui lòng gia hạn để tiếp tục sử dụng.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;