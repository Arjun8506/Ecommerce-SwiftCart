import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import logo from "../assests/swiftcart.png";
import { useAuthContext } from "../context/AuthContext";
import Logout from "./Logout";

const Header = () => {
  const [isVisible, setisVisible] = useState(false);
  const { authUser } = useAuthContext();

  const toggleMenu = () => {
    setisVisible(!isVisible);
    return;
  };

  const [toggleDrop, settoggleDrop] = useState(false);

  const toggleDropDown = () => {
    settoggleDrop(!toggleDrop);
    return;
  };

  return (
    <header>
      <div
        className="w-full py-4 flex items-center justify-between px-2 overflow-hidden absolute top-0 z-50 bg-[rgba( 255, 255, 255, 0.15 )]
        bg-opacity-15 bg-white backdrop-blur-4.5 shadow-lg rounded-b-lg border border-opacity-18 border-b-white
        "
      >
        <div className="">
          <Link to={"/"}>
            <img
              src={logo}
              alt="logo"
              className="w-14 h-14 object-cover rounded-full"
            />
          </Link>
        </div>
        <div className="flex gap-2">
          <button className="btn text-xl bg-orange-600 text-white  rounded-lg ">
            <FaCartPlus />
          </button>
          <button
            className="btn text-xl bg-orange-600 text-white  rounded-lg "
            onClick={toggleMenu}
          >
            {isVisible ? <RiDeleteBack2Fill /> : <CgMenuGridR />}
          </button>
          
          {authUser ? (
            <div className="w-12 h-12 overflow-hidden ">
              <img
                src={authUser?.profilePic}
                alt="profilepic"
                className="w-full h-full object-cover rounded-lg border-2 border-black/20"
                onClick={toggleDropDown}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div
        className={` absolute top-[16vh] -right-0 z-50 w-48 bg-white/80 rounded-lg capitalize p-2 ${
          toggleDrop ? "block" : "hidden"
        } `}
      >
        <Link
          to={"/profile"}
          className="btn bg-orange-500 text-white w-full mb-2"
        >
          my profile
        </Link>
        <Link
          to={"/myorder"}
          className="btn bg-orange-500 text-white w-full mb-2"
        >
          my order
        </Link>
        <Logout />
      </div>

      <div
        className={` w-full h-screen bg-white/80 ${
          isVisible ? "block" : "hidden"
        } ease-in-out fixed pt-20 transition-all  top-0 z-30 overflow-hidden `}
      >
        <ul className="w-full flex flex-col gap-2 items-center  pt-5 px-2 text-xl">
          <button
            type="button"
            className="btn bg-orange-500 text-white uppercase w-full"
          >
            <Link to={"/about"}>About us</Link>
          </button>
          <button
            type="button"
            className="btn bg-orange-500 text-white uppercase w-full"
          >
            <Link to={"/shop"}>shop</Link>
          </button>
          <button
            type="button"
            className="btn bg-orange-500 text-white uppercase w-full"
          >
            <Link to={"/blog"}>blogs</Link>
          </button>
          <button
            type="button"
            className="btn bg-orange-500 text-white uppercase w-full"
          >
            <Link to={"/contact"}>contact us</Link>
          </button>

          {authUser ? (
            ""
          ) : (
            <button
              type="button"
              className="btn bg-orange-500 text-white uppercase w-full"
            >
              <Link to={"/login"}>login</Link>
            </button>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
