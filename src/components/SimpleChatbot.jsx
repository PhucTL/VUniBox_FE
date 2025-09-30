import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaSpinner, FaTrash, FaQuoteLeft } from 'react-icons/fa';
import chatbotService from '../redux/services/chatbot/chatbotService';
import { toast } from 'react-toastify';

const SimpleChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Get user ID from multiple sources
  const authUserRedux = useSelector((state) => state.auth?.user);
  const authUserLocal = JSON.parse(localStorage.getItem("currentUser") || "null");
  const authUser = authUserRedux || authUserLocal;
  const userId = authUser?.userId || authUser?.id || localStorage.getItem("userId");

  // Debug logging
  console.log('Chatbot Debug:', {
    authUserRedux,
    authUserLocal,
    authUser,
    userId,
    localStorage_currentUser: localStorage.getItem("currentUser"),
    localStorage_userId: localStorage.getItem("userId")
  });

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history when opening
  useEffect(() => {
    if (isOpen && userId && messages.length === 0) {
      loadChatHistory();
    }
  }, [isOpen, userId]);

  const loadChatHistory = async () => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      const response = await chatbotService.getChatHistory(userId);
      
      if (response && response.result) {
        // Convert backend format to frontend format
        const formattedMessages = [];
        response.result.forEach((item, index) => {
          if (item.userMessage) {
            formattedMessages.push({
              id: `user-${index}`,
              type: 'user',
              content: item.userMessage,
              timestamp: item.timestamp || new Date().toISOString()
            });
          }
          if (item.botResponse) {
            formattedMessages.push({
              id: `bot-${index}`,
              type: 'bot',
              content: item.botResponse,
              timestamp: item.timestamp || new Date().toISOString()
            });
          }
        });
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Load chat history error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !userId || isSending) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsSending(true);

    // Add user message immediately
    const userMsg = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const response = await chatbotService.sendMessage(userId, userMessage);
      
      if (response && response.result) {
        // Add bot response
        const botMsg = {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: response.result.response,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (error) {
      console.error('Send message error:', error);
      toast.error('Không thể gửi tin nhắn');
      
      // Add error message
      const errorMsg = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content: 'Xin lỗi, tôi gặp sự cố kỹ thuật. Vui lòng thử lại sau.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleNewSession = async () => {
    if (!userId) return;
    
    try {
      await chatbotService.clearChatHistory(userId);
      setMessages([]);
      toast.success('Đã tạo cuộc trò chuyện mới');
    } catch (error) {
      toast.error('Không thể xóa lịch sử chat');
    }
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
          title="Citation Assistant"
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
            disabled={isLoading}
          >
            <FaTrash className="text-sm" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Đóng"
          >
            <FaTimes />
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

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Hỏi về trích dẫn và đạo văn..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isSending || !userId}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isSending || !userId}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-xl transition-colors"
          >
            <FaPaperPlane className="text-sm" />
          </button>
        </div>
        
        {/* Debug info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
            <p><strong>Debug:</strong> UserId = {userId || 'null'}</p>
            <p>AuthUser: {authUser ? JSON.stringify(authUser) : 'null'}</p>
          </div>
        )}
        
        {!userId && (
          <p className="text-xs text-red-500 mt-2">Vui lòng đăng nhập để sử dụng chatbot</p>
        )}
      </form>
    </div>
  );
};

export default SimpleChatbot;