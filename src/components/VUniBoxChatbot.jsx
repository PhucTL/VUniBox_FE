import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk, getChatHistoryThunk, clearChatHistoryThunk } from '../redux/thunks/chatbot/chatbotThunks';
import { FaPaperPlane, FaTrash, FaRobot, FaUser, FaSpinner, FaQuoteLeft } from 'react-icons/fa';

const VUniBoxChatbot = () => {
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0); // Add force update state
  const messagesEndRef = useRef(null);
  
  // Get auth user info
  const authUser = useSelector((state) => state.auth?.user) || JSON.parse(localStorage.getItem("currentUser") || "null");
  const userId = authUser?.userId || authUser?.id || localStorage.getItem("userId");
  
  // Get chatbot state - with fallback
  const chatbotState = useSelector(state => state.chatbot) || {};
  const { messages = [], isLoading = false, isSending = false, messageCount = 0, error = null } = chatbotState;

  // Debug logging
  console.log('VUniBox ChatBot Debug:', { userId, chatbotState });

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history when component mounts
  useEffect(() => {
    if (userId && isOpen) {
      dispatch(getChatHistoryThunk(userId));
      setForceUpdate(prev => prev + 1); // Force refresh on mount
    }
  }, [dispatch, userId, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;
    
    // Check if user is logged in
    if (!userId) {
      alert('Vui lòng đăng nhập để sử dụng chatbot!');
      return;
    }

    console.log('Sending message:', { userId, message: inputMessage });
    
    try {
      const result = await dispatch(sendMessageThunk({ userId, message: inputMessage }));
      console.log('Message result:', result);
      
      if (result.type.endsWith('/rejected')) {
        console.error('Send message failed:', result.payload);
        alert('Gửi tin nhắn thất bại: ' + (result.payload || 'Lỗi không xác định'));
      }
      
      setInputMessage('');
    } catch (error) {
      console.error('Send message error:', error);
      alert('Có lỗi xảy ra khi gửi tin nhắn');
    }
  };

  const handleNewSession = () => {
    if (!userId) {
      alert('Vui lòng đăng nhập để sử dụng chatbot!');
      return;
    }
    
    // Xóa luôn không cần hỏi xác nhận
    dispatch(clearChatHistoryThunk(userId));
    setForceUpdate(prev => prev + 1); // Force component update
  };

  const contextPrompts = [
    "Làm thế nào để tạo một dự án tài liệu mới?",
    "Cách tìm kiếm tài liệu đã lưu trong thư viện?", 
    "Hướng dẫn phân loại và tổ chức tài liệu",
    "Làm sao để chia sẻ tài liệu với bạn bè?",
    "Cách backup và bảo vệ tài liệu quan trọng",
    "Tính năng nào giúp quản lý tài liệu hiệu quả?",
    "Cách sử dụng thùng rác để khôi phục tài liệu"
  ];

  const handleContextPrompt = (prompt) => {
    if (isSending) return;
    
    // Check if user is logged in
    if (!userId) {
      alert('Vui lòng đăng nhập để sử dụng chatbot!');
      return;
    }
    
    setInputMessage(prompt);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaRobot className="text-2xl" />
        </button>
      </div>
    );
  };

  return (
    <div key={`chatbot-${forceUpdate}`} className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FaQuoteLeft className="text-lg" />
          <div>
            <h3 className="font-semibold">VUniBox Assistant</h3>
            <p className="text-xs opacity-90">Hỗ trợ quản lý tài liệu</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleNewSession}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Cuộc trò chuyện mới"
          >
            <FaTrash className="text-sm" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Đóng"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <FaSpinner className="animate-spin text-blue-500 text-xl" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center space-y-4">
            {!userId ? (
              // Show login prompt when user is not logged in
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                <div className="text-orange-600 text-2xl mx-auto mb-2">🔒</div>
                <p className="text-orange-700 text-sm font-medium">
                  Vui lòng đăng nhập để sử dụng VUniBox Assistant
                </p>
                <p className="text-orange-600 text-xs mt-2">
                  Bạn cần đăng nhập để có thể chat với AI và lưu lịch sử trò chuyện
                </p>
              </div>
            ) : (
              // Show normal welcome message when logged in
              <>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <FaQuoteLeft className="text-blue-500 text-2xl mx-auto mb-2" />
                  <p className="text-gray-700 text-sm">
                    Xin chào! Tôi là trợ lý VUniBox AI. Tôi có thể giúp bạn:
                  </p>
                  <ul className="text-xs text-gray-600 mt-2 space-y-1">
                    <li>• Quản lý và tổ chức tài liệu cá nhân</li>
                    <li>• Hướng dẫn sử dụng các tính năng của VUniBox</li>
                    <li>• Tìm kiếm và phân loại tài liệu hiệu quả</li>
                    <li>• Chia sẻ và backup tài liệu an toàn</li>
                    <li>• Tối ưu hóa quy trình học tập và làm việc</li>
                  </ul>
                </div>
                
                {/* Context Prompts */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600">Câu hỏi gợi ý:</p>
                  {contextPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleContextPrompt(prompt)}
                      className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors"
                      disabled={isSending}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'bot' && (
                    <FaRobot className="text-blue-500 mt-1 flex-shrink-0" />
                  )}
                  {message.type === 'user' && (
                    <FaUser className="text-white mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content.split('\n').map((line, index) => {
                        // Handle bullet points
                        if (line.trim().startsWith('•')) {
                          return (
                            <div key={index} className="flex items-start mb-1">
                              <span className="text-blue-500 mr-2 flex-shrink-0">•</span>
                              <span>{line.trim().substring(1).trim()}</span>
                            </div>
                          );
                        }
                        
                        // Handle numbered lists
                        const numberedMatch = line.match(/^(\d+\.)\s*(.+)/);
                        if (numberedMatch) {
                          return (
                            <div key={index} className="flex items-start mb-1">
                              <span className="text-blue-600 mr-2 flex-shrink-0 font-medium">{numberedMatch[1]}</span>
                              <span>{numberedMatch[2]}</span>
                            </div>
                          );
                        }
                        
                        // Regular paragraph
                        return (
                          <p key={index} className={line.trim() ? "mb-2" : "mb-1"}>
                            {line.trim() || '\u00A0'}
                          </p>
                        );
                      })}
                    </div>
                    <p className={`text-xs mt-2 opacity-70 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {isSending && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
              <div className="flex items-center space-x-2">
                <FaRobot className="text-blue-500" />
                <FaSpinner className="animate-spin text-gray-500" />
                <span className="text-sm text-gray-500">Đang trả lời...</span>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="flex justify-center">
            <div className="bg-red-50 p-3 rounded-xl border border-red-200 max-w-[80%]">
              <div className="flex items-center space-x-2">
                <span className="text-red-500">⚠️</span>
                <span className="text-sm text-red-700">Lỗi: {error}</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Count */}
      {false && messageCount > 0 && (
        <div className="px-4 py-2 bg-gray-50 text-center">
          <span className="text-xs text-gray-500">
            Đã sử dụng {messageCount} tin nhắn
          </span>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={!userId ? "Vui lòng đăng nhập để sử dụng chatbot..." : "Hỏi về VUniBox và quản lý tài liệu..."}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isSending || !userId}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isSending || !userId}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-xl transition-colors"
            title={!userId ? "Vui lòng đăng nhập để sử dụng chatbot" : "Gửi tin nhắn"}
          >
            <FaPaperPlane className="text-sm" />
          </button>
        </div>
        {!userId && (
          <p className="text-xs text-orange-600 mt-2 text-center">
            Bạn cần đăng nhập để sử dụng chức năng chatbot
          </p>
        )}
      </form>
    </div>
  );
};

export default VUniBoxChatbot;