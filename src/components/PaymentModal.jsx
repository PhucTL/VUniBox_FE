import React, { useState } from 'react';
import { FaTimes, FaQrcode, FaExternalLinkAlt, FaCopy, FaCheckCircle } from 'react-icons/fa';

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  paymentData, 
  onPaymentSuccess,
  isCheckingPayment = false 
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !paymentData) return null;

  // Debug log
  console.log('PaymentModal data:', paymentData);

  // Copy payment URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(paymentData.paymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Open payment URL in new tab
  const openPaymentUrl = () => {
    window.open(paymentData.paymentUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-[500px] max-w-[90vw] border border-blue-100 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full border border-red-200 flex items-center justify-center text-red-600 hover:text-red-800 hover:border-red-400 transition-colors duration-200"
          onClick={onClose}
          aria-label="Đóng"
        >
          <FaTimes />
        </button>
        
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">
              Thanh toán PayOS
            </h3>
            <p className="text-gray-600">
              Quét mã QR hoặc click link để thanh toán
            </p>
          </div>

          {/* Payment Info */}
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Số tiền:</span>
              <span className="text-xl font-bold text-blue-600">
                {paymentData.amount?.toLocaleString('vi-VN')} VND
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Mã giao dịch:</span>
              <span className="text-gray-600">{paymentData.orderCode}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Hết hạn:</span>
              <span className="text-gray-600">
                {paymentData.expiryDate ? 
                  new Date(paymentData.expiryDate).toLocaleString('vi-VN') : 
                  'Không xác định'
                }
              </span>
            </div>
          </div>

          {/* QR Code */}
          {paymentData.qrCodeUrl && (
            <div className="text-center">
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200 inline-block">
                <img 
                  src={`data:image/png;base64,${paymentData.qrCodeUrl}`}
                  alt="QR Code thanh toán"
                  className="w-48 h-48 object-contain"
                  onError={(e) => {
                    // Fallback nếu QR code không load được
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex-col items-center justify-center hidden">
                  <FaQrcode className="text-4xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">QR Code</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Sử dụng app banking để quét
                  </p>
                  <p className="text-xs text-blue-600 mt-2 px-2 text-center">
                    QR: {paymentData.qrCodeUrl.substring(0, 50)}...
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Quét mã QR bằng ứng dụng ngân hàng để thanh toán
              </p>
            </div>
          )}

          {/* Payment URL */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-gray-100 text-gray-700 p-3 rounded-xl border border-gray-300 hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
              >
                <FaCopy className="text-gray-500" />
                <span className="text-sm truncate">{paymentData.paymentUrl}</span>
                {copied && <FaCheckCircle className="text-green-500 ml-auto" />}
              </button>
            </div>
            
            <button
              onClick={openPaymentUrl}
              className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FaExternalLinkAlt />
              Mở link thanh toán
            </button>
          </div>

          {/* Status */}
          <div className="text-center">
            {isCheckingPayment ? (
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Đang kiểm tra trạng thái thanh toán...</span>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">
                Sau khi thanh toán thành công, hệ thống sẽ tự động kích hoạt gói dịch vụ
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              onClick={onPaymentSuccess}
              disabled={isCheckingPayment}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
            >
              Đã thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;