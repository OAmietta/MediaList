// import pjson from "../../package.json";
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
      //   "https://api.themoviedb.org/3/trending/all/day?language=en-US",
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
  //   getId: async (dni: number) => {
  //     const res = await fetch(
  //       `${pjson.apiUrl}/ws_sr_padron_a13/getIdListByDocumento?documento=${dni}`,
  //       {
  //         method: "GET",
  //         headers: new Headers({
  //           Authorization: `Apikey ${pjson.apiKey}`,
  //         }),
  //       }
  //     );
  //     if (res.status == 500) {
  //       throw new Error("Ha ocurrido un error en el servidor.");
  //     }
  //     return await res.json();
  //   },
};
