import React, { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { services } from "./api/services";
import { getImageData, getMediaList, setLoading } from "./app/mediasSlice";
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
    dispatch(setLoading(true));
    services
      .getInitialData()
      .then((res: Image) => {
        dispatch(getImageData(res));
      })
      .catch((error: Error) => {
        throw new Error("error", error);
      });

    services
      .getList()
      .then((res: MediaList) => {
        dispatch(getMediaList(res));
        dispatch(setLoading(false));
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
