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

export default function App() {
  const dispatch = useAppDispatch();
  // const medias = useAppSelector(selectMedias);

  useEffect(() => {
    handleData();
  }, []);

  const handleData = () => {
    // services
    //   .getInitialData()
    //   .then((res) => {
    //     console.log("response app: ", res);
    // dispatch(getImageData(imagesData.image));
    //   })
    //   .catch((error) => {
    //     console.log("error: ", error);
    //   });

    // services
    //   .getList()
    //   .then((res) => {
    //     console.log("response app: ", res);
    //     dispatch(getMediaList(res));
    //   })
    //   .catch((error) => {
    //     console.log("error: ", error);
    //   });
    dispatch(getImageData(imagesData.image));
    dispatch(getMediaList(mediaList.results));
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="details/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
