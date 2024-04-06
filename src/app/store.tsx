import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import mediaReducer from "./mediasSlice";

export const store = configureStore({
  reducer: {
    // register your reducer here
    users: usersReducer,
    medias: mediaReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
