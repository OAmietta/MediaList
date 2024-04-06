import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Medias } from "../utils/interfaces";

const initialState: Medias = {
  images: {
    base_url: "",
    secure_base_url: "",
    backdrop_sizes: [],
    logo_sizes: [],
    poster_sizes: [],
    profile_sizes: [],
    still_sizes: [],
  },
  mediasList: [
    {
      backdrop_path: "",
      id: 0,
      title: "",
      original_language: "",
      overview: "",
      poster_path: "",
      media_type: "",
      genre_ids: [],
      popularity: 0,
      vote_average: 0,
      vote_count: 0,
    },
  ],
};

export const mediasSlice = createSlice({
  name: "medias",
  initialState, // media state
  reducers: {
    getImagesData: (state, action) => {
      state.images = action.payload;
    },
    getMediaList: (state, action) => {
      state.mediasList = action.payload;
    },
  },
});

// export state selector
export const selectMedias = (state: RootState) => state.medias;
// export dispatch actions
export const { getImagesData, getMediaList } = mediasSlice.actions;
// export reducer for register it to the store
export default mediasSlice.reducer;
