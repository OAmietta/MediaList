import React from "react";

const Navbar = () => {
  // Array containing navigation items
  const navItems = [{ id: 1, text: "Home" }];

  return (
    <div className="bg-black flex justify-between items-center h-24 w-[770px] px-4 text-white fixed">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">:MEDIALIST:</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
