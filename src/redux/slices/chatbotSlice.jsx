import { createSlice } from '@reduxjs/toolkit';

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
  }
});

export const { resetChatbot, clearError, addMessage, setLoading, setSending } = chatbotSlice.actions;
export default chatbotSlice.reducer;