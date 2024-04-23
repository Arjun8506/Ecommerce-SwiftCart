import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import logo from "../assests/swiftcart.png"

const Header = () => {
    const [isVisible, setisVisible] = useState(false)

    const toggleMenu = () => {
        setisVisible(!isVisible)
        return
    }

  return (
    <header>
        <div className="w-full py-4 flex items-center justify-between px-2 overflow-hidden absolute top-0 z-40">
            <div className="">
                <Link to={"/"}>
                <img src={logo} alt="logo" className="w-14 h-14 object-cover rounded-full" />
                </Link>
            </div>
            <div className="flex gap-2">
            <button className="btn text-xl bg-orange-600 text-white  rounded-lg ">
                <FaCartPlus />
            </button>
            <button className="btn text-xl bg-orange-600 text-white  rounded-lg " onClick={toggleMenu} > 
                {isVisible ? <RiDeleteBack2Fill /> : <CgMenuGridR />}
            </button>
            </div>
        </div>
        <div className = {` w-full h-screen bg-white/80 ${isVisible ? "block" : "hidden"} ease-in-out fixed pt-20 transition-all  top-0 z-30 overflow-hidden `}
        >
            <ul className="w-full flex flex-col gap-2 items-center  pt-5 px-2 text-xl">
               <button type="button" className="btn bg-orange-500 text-white uppercase w-full" >
                <Link to={"/about"}>
                    About us
                </Link>
               </button>
               <button type="button" className="btn bg-orange-500 text-white uppercase w-full" >
                <Link to={"/shop"}>
                    shop
                </Link>
               </button>
               <button type="button" className="btn bg-orange-500 text-white uppercase w-full" >
                <Link to={"/blog"}>
                    blogs
                </Link>
               </button>
               <button type="button" className="btn bg-orange-500 text-white uppercase w-full" >
                <Link to={"/contact"}>
                    contact us
                </Link>
               </button>
               <button type="button" className="btn bg-orange-500 text-white uppercase w-full" >
                <Link to={"/login"}>
                    login
                </Link>
               </button>
            </ul>
        </div>
    </header>
  );
};

export default Header;
