import React from "react";
import { BiArrowToTop, BiWorld } from "react-icons/bi";
import { Link } from "react-router-dom";

const Footer = () => {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className=" w-full min-h-fit bg-slate-950 text-white">
      <button
        className="p-4 bg-slate-900 w-full rounded-md hover:opacity-90 flex items-center justify-center flex-col"
        onClick={scrollToTop}
      >
        <BiArrowToTop />
        Back To Top
      </button>
      <div className="py-5 flex items-center justify-between px-5 bg-slate-800">
        <div className="flex flex-col gap-2">
          <Link to={"/"}>Your Cart</Link>
          <Link to={"/"}>Sell</Link>
          <Link to={"/"}>SwiftCart Pay</Link>
          <Link to={"/"}>Your SwiftCart.co</Link>
        </div>
        <div className=" flex flex-col gap-2">
          <Link to={"/"}>Your Account</Link>
          <Link to={"/"}>Returns</Link>
          <Link to={"/"}>Contact Us</Link>
          <Link to={"/"}>Customer Service</Link>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center">
            <p className="flex items-center gap-2 text-xs text-gray-400 mt-4"><BiWorld />English</p>
            <h1>Already a customer? <Link to={"/"}>Log in</Link></h1>
            <p className="text-xs text-white">© 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
};

export default Footer;
