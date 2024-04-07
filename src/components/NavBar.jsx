import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  // Array containing navigation items
  const navItems = [{ id: 1, text: "Home" }];

  return (
    <div className="bg-black flex justify-between items-center h-24 w-[770px] px-4 text-white fixed">
      {/* Logo */}
      <button
        className="p-4 hover:bg-[#00df9a] rounded-xl cursor-pointer duration-300 hover:text-black"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <a href="/" style={{ textDecoration: "none" }}>
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">
          :MEDIALIST:
        </h1>
      </a>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="/"
            className="m-2"
            style={{ textDecoration: "none" }}
          >
            <li className="p-4 hover:bg-[#00df9a] rounded-xl cursor-pointer duration-300 hover:text-black">
              {item.text}
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
