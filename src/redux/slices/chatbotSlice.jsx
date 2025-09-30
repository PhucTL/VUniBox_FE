import { createSlice } from '@reduxjs/toolkit';
import { sendMessageThunk, getChatHistoryThunk, clearChatHistoryThunk } from '../../thunks/chatbot/chatbotThunks';

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
    }
  },
  extraReducers: (builder) => {
    builder
      // Send message
      .addCase(sendMessageThunk.pending, (state) => {
        state.isSending = true;
        state.error = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.isSending = false;
        state.sessionActive = true;
        state.messageCount = action.payload.messageCount;
        
        // Add user message
        state.messages.push({
          id: Date.now(),
          type: 'user',
          content: action.payload.userMessage,
          timestamp: action.payload.timestamp
        });
        
        // Add bot response
        state.messages.push({
          id: Date.now() + 1,
          type: 'bot',
          content: action.payload.botResponse,
          timestamp: action.payload.timestamp
        });
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload;
      })
      
      // Get chat history
      .addCase(getChatHistoryThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getChatHistoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
        state.sessionActive = action.payload.length > 0;
      })
      .addCase(getChatHistoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Clear chat history
      .addCase(clearChatHistoryThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearChatHistoryThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.messages = [];
        state.messageCount = 0;
        state.sessionActive = false;
        state.error = null;
      })
      .addCase(clearChatHistoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { resetChatbot, clearError } = chatbotSlice.actions;
export default chatbotSlice.reducer;