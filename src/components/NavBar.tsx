import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Back } from "../utils/icons";
import { setSearchItem } from "../app/mediasSlice";
import { useAppDispatch } from "../app/hooks";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleBack = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(setSearchItem(true));
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center bg-zinc-950 sm:h-[12vh] h-[15vh] sm:min-w-[768px] min-w-[100%] max-w-[768px] px-4 text-white fixed z-50">
      {/* Logo */}
      <Back
        onClick={() => handleBack()}
        className={
          "m-4 cursor-pointer duration-300 hover:scale-125 absolute left-0"
        }
      />
      <div>
        <Link
          to="/"
          onClick={() => {
            dispatch(setSearchItem(true));
          }}
          style={{ textDecoration: "none" }}
        >
          <h1
            className={`w-full text-3xl font-bold text-[#00df9a] duration-300 hover:scale-110`}
          >
            :MEDIALIST:
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
