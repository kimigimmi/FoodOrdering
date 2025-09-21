import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice";
import cartReducer from "./cartSlice";
import commentsReducer from "./commentsSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer,
    comments: commentsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
