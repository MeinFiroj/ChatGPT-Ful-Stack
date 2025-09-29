import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated : false,
  loading : true
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true
      state.loading = false
    },
  },
});

export const { loadUser } = userSlice.actions;

export default userSlice.reducer;
