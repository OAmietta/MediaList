import React, { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { services } from "./api/services";
import { getImageData, getMediaList } from "./app/mediasSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Details from "./pages/Details";
import Footer from "./components/Footer";
import { Image } from "./interfaces";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleData();
  }, []);

  const handleData = () => {
    services
      .getInitialData()
      .then((res: Image) => {
        console.log("response app: ", res);
        dispatch(getImageData(res));
      })
      .catch((error: Error) => {
        throw new Error("error", error);
      });

    services
      .getList()
      .then((res: MediaList) => {
        console.log("response app: ", res);
        dispatch(getMediaList(res));
      })
      .catch((error: Error) => {
        throw new Error("error", error);
      });
  };

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
