import { MediaParams } from "../interfaces";
const API_KEY = process.env.REACT_APP_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const services = {
  getList: async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
    return res.results;
  },
  getInitialData: async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/configuration",
      options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
    return res;
  },
  getSimilarMedia: async (
    mediaType: MediaParams["mediaType"],
    id: MediaParams["id"]
  ) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/similar?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
    return res;
  },

  getMediaItem: async (
    mediaType: MediaParams["mediaType"],
    id: MediaParams["id"]
  ) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}`,
      options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
    return res;
  },
};
