import { MediaParams } from "../interfaces";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDkzN2Y3OWIyZjk4N2JkNTU1ZGU1MjM3YWJhZGIyMSIsInN1YiI6IjY2MGZlOWQ1MmQ1MzFhMDE3ZDdlYTEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pxz2NdMG1dBubFXJy_Wp1d2I4xh_WxGsPkKD3lfLtIM",
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
