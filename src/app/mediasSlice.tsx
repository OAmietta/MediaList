import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Medias } from "../interfaces/index";

const initialState: Medias = {
  image: {
    base_url: "",
    secure_base_url: "",
    backdrop_sizes: [],
    logo_sizes: [],
    poster_sizes: [],
    profile_sizes: [],
    still_sizes: [],
  },
  mediaList: [],
};

export const mediasSlice = createSlice({
  name: "medias",
  initialState, // media state
  reducers: {
    getImageData: (state, action) => {
      state.image = action.payload;
    },
    getMediaList: (state, action) => {
      state.mediaList = action.payload;
    },
  },
});

// export state selector
export const selectMedias = (state: RootState) => state.medias;
// export dispatch actions
export const { getImageData, getMediaList } = mediasSlice.actions;
// export reducer for register it to the store
export default mediasSlice.reducer;
