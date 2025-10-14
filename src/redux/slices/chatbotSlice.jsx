import { createSlice } from '@reduxjs/toolkit';
import { sendMessageThunk, getChatHistoryThunk, clearChatHistoryThunk } from '../thunks/chatbot/chatbotThunks';

const initialState = {
  messages: [],
  isLoading: false,
  isSending: false,
  error: null,
  messageCount: 0,
  sessionActive: false
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    // Reset chatbot state
    resetChatbot: (state) => {
      return initialState;
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    // Add message
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // Set loading
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // Set sending
    setSending: (state, action) => {
      state.isSending = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Send Message
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.isSending = true;
        state.error = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.isSending = false;
        
        // Add user message
        state.messages.push({
          id: Date.now() + '_user',
          type: 'user',
          content: action.payload.userMessage,
          timestamp: action.payload.timestamp
        });
        
        // Add bot response
        state.messages.push({
          id: Date.now() + '_bot',
          type: 'bot',
          content: action.payload.botResponse,
          timestamp: action.payload.timestamp
        });
        
        state.messageCount = action.payload.messageCount;
        state.sessionActive = true;
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload;
      })
      
      // Get Chat History
      .addCase(getChatHistoryThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getChatHistoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload || [];
        state.sessionActive = action.payload?.length > 0;
      })
      .addCase(getChatHistoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Clear Chat History
      .addCase(clearChatHistoryThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearChatHistoryThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.messages = [];
        state.messageCount = 0;
        state.sessionActive = false;
      })
      .addCase(clearChatHistoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { resetChatbot, clearError, addMessage, setLoading, setSending } = chatbotSlice.actions;
export default chatbotSlice.reducer;