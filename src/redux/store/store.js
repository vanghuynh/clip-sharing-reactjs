import authReducer from "./auth";
import popupReducer from "./popup";

import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: { auth: authReducer, popup: popupReducer },
});
export default store;
