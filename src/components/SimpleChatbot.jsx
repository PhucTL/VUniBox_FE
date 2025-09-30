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

  // Format bot response for better display
  const formatBotResponse = (text) => {
    if (!text) return text;
    
    // Split by line breaks and format
    const lines = text.split(/\n/).filter(line => line.trim());
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      // Handle numbered lists (1. 2. 3.)
      if (/^\d+\./.test(trimmedLine)) {
        const [, number, content] = trimmedLine.match(/^(\d+\.\s*)(.*)/) || [];
        return (
          <div key={index} className="flex mb-2">
            <span className="text-blue-600 font-semibold mr-2 min-w-[1.5rem]">{number}</span>
            <span className="flex-1">{content}</span>
          </div>
        );
      }
      
      // Handle bullet points (-, *, •)
      if (/^[-•*]/.test(trimmedLine)) {
        const content = trimmedLine.replace(/^[-•*]\s*/, '');
        return (
          <div key={index} className="flex mb-2">
            <span className="text-blue-500 mr-2 mt-1">•</span>
            <span className="flex-1">{content}</span>
          </div>
        );
      }
      
      // Handle bold text (**text**)
      if (/\*\*(.*?)\*\*/.test(trimmedLine)) {
        return (
          <div key={index} className="mb-2">
            {trimmedLine.split(/(\*\*.*?\*\*)/).map((part, i) => 
              /\*\*(.*?)\*\*/.test(part) ? 
                <strong key={i} className="font-semibold text-gray-900">{part.replace(/\*\*/g, '')}</strong> : 
                part
            )}
          </div>
        );
      }
      
      // Regular paragraph
      return <div key={index} className="mb-2">{trimmedLine}</div>;
    });
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
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
              <FaQuoteLeft className="text-blue-500 text-2xl mx-auto mb-3" />
              <h4 className="font-semibold text-blue-900 mb-2">Chào mừng đến với Citation AI!</h4>
              <p className="text-gray-700 text-sm mb-3">
                Tôi có thể giúp bạn:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div className="flex items-center">
                  <span className="text-blue-500 mr-1">✓</span>
                  Hướng dẫn trích dẫn
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-1">✓</span>
                  Kiểm tra đạo văn
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-1">✓</span>
                  Định dạng APA/MLA
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-1">✓</span>
                  Tính nguyên bản
                </div>
              </div>
            </div>
            
            {/* Context Prompts */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600">💡 Bắt đầu với câu hỏi:</p>
              {contextPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleContextPrompt(prompt)}
                  className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 rounded-lg transition-all duration-200"
                  disabled={isSending}
                >
                  <span className="text-blue-600 mr-1">💬</span>
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
                className={`max-w-[85%] p-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md shadow-md'
                    : 'bg-gray-50 text-gray-800 rounded-bl-md border border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'bot' && (
                    <FaRobot className="text-blue-500 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm leading-relaxed">
                      {message.type === 'bot' ? 
                        formatBotResponse(message.content) : 
                        message.content
                      }
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
            <div className="bg-gray-50 border border-gray-200 p-3 rounded-2xl rounded-bl-md">
              <div className="flex items-center space-x-2">
                <FaRobot className="text-blue-500" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-500">Đang suy nghĩ...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50 rounded-b-2xl">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={userId ? "Hỏi về trích dẫn và đạo văn..." : "Vui lòng đăng nhập..."}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
            disabled={isSending || !userId}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isSending || !userId}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FaPaperPlane className="text-sm" />
          </button>
        </div>
        
        {!userId && (
          <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-xs text-orange-700 flex items-center">
              <FaUser className="mr-2" />
              Vui lòng đăng nhập để sử dụng Citation Assistant
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SimpleChatbot;