import React from "react";
import "./spinner.css";

export default function Spinner() {
  return (
    <div className="bg-zinc-950 z-40 flex items-center justify-center h-screen w-full opacity-60">
      <div className="container">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
}
