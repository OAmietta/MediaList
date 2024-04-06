import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./mediasSlice";

export const store = configureStore({
  reducer: {
    medias: mediaReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
