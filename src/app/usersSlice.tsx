import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UsersState {
  value: [
    {
      id: number;
      name: string;
    }
  ];
}

const initialState: UsersState = {
  value: [
    {
      id: 1,
      name: "jack",
    },
  ],
};

export const usersSlice = createSlice({
  name: "users",
  initialState, // users state
  reducers: {
    // logic to add user
    addUser: (state, action: PayloadAction<{ id: number; name: string }>) => {
      state.value.push(action.payload);
    },
  },
});

// export state selector
export const selectUsers = (state: RootState) => state.users.value;
// export dispatch actions
export const { addUser } = usersSlice.actions;
// export reducer for register it to the store
export default usersSlice.reducer;
