import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk, getChatHistoryThunk, clearChatHistoryThunk } from '../redux/thunks/chatbot/chatbotThunks';
import { FaPaperPlane, FaTrash, FaRobot, FaUser, FaSpinner, FaQuoteLeft } from 'react-icons/fa';

const CitationChatbot = () => {
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Get auth user info
  const authUser = useSelector((state) => state.auth?.user) || JSON.parse(localStorage.getItem("currentUser") || "null");
  const userId = authUser?.userId || authUser?.id || localStorage.getItem("userId");
  
  // Get chatbot state - with fallback
  const chatbotState = useSelector(state => state.chatbot) || {};
  const { messages = [], isLoading = false, isSending = false, messageCount = 0 } = chatbotState;

  // Debug logging
  console.log('ChatBot Debug:', { userId, chatbotState });

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
    }
  }, [dispatch, userId, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !userId || isSending) return;

    await dispatch(sendMessageThunk({ userId, message: inputMessage }));
    setInputMessage('');
  };

  const handleNewSession = () => {
    if (!userId) return;
    dispatch(clearChatHistoryThunk(userId));
  };

  const contextPrompts = [
    "Làm sao để trích dẫn đúng cách?",
    "Phân biệt đạo văn và trích dẫn",
    "Định dạng trích dẫn APA",
    "Kiểm tra đạo văn như thế nào?",
    "Các loại trích dẫn phổ biến"
  ];

  const handleContextPrompt = (prompt) => {
    if (!userId || isSending) return;
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
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FaQuoteLeft className="text-lg" />
          <div>
            <h3 className="font-semibold">Citation Assistant</h3>
            <p className="text-xs opacity-90">Hỗ trợ trích dẫn & đạo văn</p>
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
            <div className="bg-blue-50 p-4 rounded-xl">
              <FaQuoteLeft className="text-blue-500 text-2xl mx-auto mb-2" />
              <p className="text-gray-700 text-sm">
                Xin chào! Tôi là trợ lý Citation AI. Tôi có thể giúp bạn:
              </p>
              <ul className="text-xs text-gray-600 mt-2 space-y-1">
                <li>• Hướng dẫn cách trích dẫn đúng</li>
                <li>• Phân biệt đạo văn và trích dẫn</li>
                <li>• Định dạng citation chuẩn</li>
                <li>• Kiểm tra tính nguyên bản</li>
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
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
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
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 opacity-70 ${
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
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Count */}
      {messageCount > 0 && (
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
            placeholder="Hỏi về trích dẫn và đạo văn..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isSending}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-xl transition-colors"
          >
            <FaPaperPlane className="text-sm" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CitationChatbot;