import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useAuthContext } from "../context/AuthContext";
import Logout from "./Logout";
import { useCartContext } from "../context/CartContext";
import { MdDashboard } from "react-icons/md";
import { CgProfile, CgLogOut } from "react-icons/cg";

const Header = () => {
  const [isVisible, setisVisible] = useState(false);
  const { authUser } = useAuthContext();
  const { cartItems } = useCartContext()

  const toggleMenu = () => {
    setisVisible(!isVisible);
    return;
  };

  const [toggleDrop, settoggleDrop] = useState(false);

  const toggleDropDown = () => {
    settoggleDrop(!toggleDrop);
    return;
  };

  useEffect(() => {
    if (!authUser) {
      settoggleDrop(false)
    }
  }, [Logout])
  

  return (
    <header>
      <div
        className="w-full max-w-[1500px] py-6 flex items-center justify-between px-2 overflow-hidden absolute top-0 z-50 
        "
      >
        <div className="text-purple-950 text-center uppercase">
          <Link to={"/"}>
            <h1 className="text-2xl font-extrabold">SwiftCart</h1>
            <p className="text-xs font-semibold">Online Shop</p>
          </Link>
        </div>
        <div className="flex gap-2 lg:gap-5 items-center">
        <nav>
        <div className=" hidden lg:inline">
        <ul className="w-full flex items-center gap-4">
          <button
            type="button"
            className="capitalize hover:opacity-60 font-semibold"
          >
            <Link to={"/about"}>About us</Link>
          </button>
          <button
            type="button"
            className=" capitalize hover:opacity-60 font-semibold"
          >
            <Link to={"/shop"}>shop</Link>
          </button>
          <button
            type="button"
            className=" capitalize hover:opacity-60 font-semibold"
          >
            <Link to={"/blog"}>blogs</Link>
          </button>
          <button
            type="button"
            className=" capitalize hover:opacity-60 font-semibold"
          >
            <Link to={"/contact"}>contact us</Link>
          </button>

          {authUser ? (
            ""
          ) : (
            <button
              type="button"
              className="capitalize hover:opacity-60 font-semibold"
            >
              <Link to={"/login"}>login</Link>
            </button>
          )}
        </ul>
        </div>
      </nav>
          <button
            className="text-xl lg:hidden bg-orange-600 text-white  rounded-lg p-1"
            onClick={toggleMenu}
          >
            {isVisible ? <RiDeleteBack2Fill /> : <CgMenuGridR />}
          </button>

          {authUser ? (
            <div className="w-8 h-8 overflow-hidden ">
              <img
                src={authUser?.profilePic}
                alt="profilepic"
                className="w-full h-full object-cover rounded-full border-2 border-black/20"
                onClick={toggleDropDown}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div
        className={` absolute top-[16vh] right-1 z-50 w-fit bg-white/80 flex flex-col gap-2 items-center  rounded-lg capitalize p-2 ${
          toggleDrop ? "block" : "hidden"
        } `}
        > 
        {authUser?.isAdmin === true && (
          <button className="bg-orange-500 text-white p-1 rounded-sm">
          <Link
            to={"/admin/dashboard"}
          >
            <MdDashboard />
          </Link>
          </button>
        )}
      <button className="bg-orange-500 text-white p-1 rounded-sm">
        <Link
          to={"/profile"}
        >
          <CgProfile />
        </Link>
      </button>
        <button className=" bg-orange-500 text-white  rounded-sm p-1 relative">
            <Link to={"/cart"}>
              <FaCartPlus />
            </Link>
            {cartItems.length > 0 && (
              <p className="absolute -top-3 -right-1 text-black text-xs">{cartItems.length}</p>
            ) }
          </button>
        <Logout />
      </div>

      <div
        className={` w-full h-screen bg-white/95 ${
          isVisible ? "block" : "hidden"
        } ease-in-out fixed pt-28 transition-all  top-0 z-30 overflow-hidden `}
      >
        <ul className="w-full flex flex-col items-center">
          <button
            type="button"
            className="border-t-[1px] border-dashed font-semibold border-slate-500 uppercase w-full py-4 border-b-[1px]"
          >
            <Link to={"/about"}>About us</Link>
          </button>
          <button
            type="button"
            className=" border-dashed font-semibold border-slate-500 uppercase w-full py-4 border-b-[1px]"
          >
            <Link to={"/shop"}>shop</Link>
          </button>
          <button
            type="button"
            className=" border-dashed font-semibold border-slate-500 uppercase w-full py-4 border-b-[1px]"
          >
            <Link to={"/blog"}>blogs</Link>
          </button>
          <button
            type="button"
            className=" border-dashed font-semibold border-slate-500 uppercase w-full py-4 border-b-[1px]"
          >
            <Link to={"/contact"}>contact us</Link>
          </button>

          {authUser ? (
            ""
          ) : (
            <button
              type="button"
              className=" border-dashed font-semibold border-slate-500 uppercase w-full py-4 border-b-[1px]"
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
