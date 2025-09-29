import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    loadChats: (state, action) => {
        state.chats = action.payload
    },
  },
});

export const { loadChats } = chatSlice.actions;
export default chatSlice.reducer;
