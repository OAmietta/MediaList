import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
// import { services } from "./api/services";
import { getImageData, getMediaList, selectMedias } from "./app/mediasSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Medias } from "./utils/interfaces";
import mediaList from "./templates/mediaList.json";
import imagesData from "./templates/imagesData.json";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Details from "./pages/Details";
import Footer from "./components/Footer";
// import Spinner from "./components/Spinner";

export default function App() {
  const dispatch = useAppDispatch();
  // const medias = useAppSelector(selectMedias);

  useEffect(() => {
    handleData();
  }, []);

  const handleData = () => {
    // services
    //   .getInitialData()
    //   .then((res: Image) => {
    //     console.log("response app: ", res);
    // dispatch(getImageData(imagesData.image));
    //   })
    //   .catch((error: Error) => {
    //     console.log("error: ", error);
    //   });

    // services
    //   .getList()
    //   .then((res: MediaList) => {
    //     console.log("response app: ", res);
    //     dispatch(getMediaList(res));
    //   })
    //   .catch((error: Error) => {
    //     console.log("error: ", error);
    //   });
    dispatch(getImageData(imagesData.image));
    dispatch(getMediaList(mediaList.results));
  };

  // if (medias.loading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="details/:type/:id" element={<Details />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
