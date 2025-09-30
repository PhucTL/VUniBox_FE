import React, { useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

const SimpleChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Test component - hiển thị đơn giản trước
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          title="Citation Assistant"
        >
          <FaRobot className="text-2xl" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Citation Assistant</h3>
          <p className="text-xs opacity-90">Test Version</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <FaTimes />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="text-center">
          <FaRobot className="text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Citation Chatbot</p>
          <p className="text-sm text-gray-500">
            Chatbot đang được phát triển...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleChatbot;