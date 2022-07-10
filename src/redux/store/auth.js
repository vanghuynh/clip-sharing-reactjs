import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated"),
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", true);
    },
    logout(state) {
      state.isAuthenticated = localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
    },
    setToken(state, action) {
      localStorage.setItem("token", action.payload);
      state.token = localStorage.getItem("token");
    },
    setName(state, action) {
      localStorage.setItem("id", action.payload);
      state.id = localStorage.getItem("id");
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
