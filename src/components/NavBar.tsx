import React from "react";
import { useNavigate } from "react-router-dom";
import { Back } from "../utils/icons";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black flex justify-center items-center h-24 sm:min-w-[768px] min-w-[100%] max-w-[768px] px-4 text-white fixed">
      {/* Logo */}
      <Back
        onClick={() => navigate(-1)}
        className={
          "m-4 cursor-pointer duration-300 hover:scale-125 absolute left-0"
        }
      />
      <div>
        <a href="/" style={{ textDecoration: "none" }}>
          <h1 className="w-full text-3xl font-bold text-[#00df9a] duration-300 hover:scale-110">
            :MEDIALIST:
          </h1>
        </a>
      </div>
    </div>
  );
};

export default Navbar;