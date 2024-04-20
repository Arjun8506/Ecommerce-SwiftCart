import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
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
            <div className="">
            <button className="btn text-xl bg-orange-600 text-white  rounded-lg " onClick={toggleMenu} > 
                {isVisible ? <RiDeleteBack2Fill /> : <CgMenuGridR />}
            </button>
            </div>
        </div>
        <div className = {`w-full h-screen bg-white/80 ${isVisible ? "blog" : "hidden"} ease-in-out absolute pt-20 transition-all  top-0 z-30 overflow-hidden `}
        >
            <ul className=" flex flex-col gap-2 items-center pt-5 text-xl">
                <div className="linkofmenu w-full text-center mt-2">
                <li className="border-b-2 border-purple-500 text-orange-500">
                    <Link to={"/"}>
                        Home
                    </Link>
                </li>
                </div>
                <div className="linkofmenu w-full text-center mt-2">
                <li className="border-b-2 border-purple-500 text-orange-500">
                    <Link to={"/shop"}>
                        Shop
                    </Link>
                </li>
                </div>
                <div className="linkofmenu w-full text-center mt-2">
                <li className="border-b-2 border-purple-500 text-orange-500">
                    <Link to={"/about"}>
                        About Us
                    </Link>
                </li>
                </div>
                <div className="linkofmenu w-full text-center mt-2">
                <li className="border-b-2 border-purple-500 text-orange-500">
                    <Link to={"/blogs"}>
                        Blog
                    </Link>
                </li>
                </div>
                <div className="linkofmenu w-full text-center mt-2">
                <li className="border-b-2 border-purple-500 text-orange-500">
                    <Link to={"/contact"}>
                        Contact Us
                    </Link>
                </li>
                </div>
                <div className="linkofmenu w-full text-center mt-2">
                <li className="border-b-2 border-purple-500 text-orange-500">
                    <Link to={"/login"}>
                        Login
                    </Link>
                </li>
                </div>
            </ul>
        </div>
    </header>
  );
};

export default Header;
