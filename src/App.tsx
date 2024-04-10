import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Details from "./pages/Details";
import Footer from "./components/Footer";
import useMedia from "./hooks/useMedia";

export default function App() {
  const { getImageConfig } = useMedia();

  useEffect(() => {
    getImageConfig();
  }, []);

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
