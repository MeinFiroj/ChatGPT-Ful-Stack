import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: []
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    loadMessage: (state, action) => {
      state.messages = action.payload;
    },
    loadSingleMessage : (state, action)=>{
      // const msg = action.payload
      state.messages.push(action.payload)
    },
    removeMessages : (state, action)=>{
      state.messages = [];
    }
  },
});

export const { loadMessage, loadSingleMessage, removeMessages } = messageSlice.actions;

export default messageSlice.reducer;
