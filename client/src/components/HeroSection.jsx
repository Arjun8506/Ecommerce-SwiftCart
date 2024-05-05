import React, { useEffect, useState } from "react";

import slide1 from "../assests/slide1.jpg";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="max-w-full h-fit -z-50 ">

        <div className="w-full h-96 lg:h-screen">
      <img src={slide1} alt="" className=" w-full h-full object-cover aspect-auto" />
        </div>
        <div className="w-full h-96 lg:h-screen text-purple-950 text-sm font-semibold px-2 absolute top-0 flex flex-col items-start justify-end pb-16 lg:pb-20 lg:px-5">
          <h1 className="mb-5 text-xl lg:text-3xl uppercase font-extrabold">Just Sit back and <br /> let us do the work <br /> for you!</h1>
          <button className="font-bold p-2 px-3 bg-orange-600 text-white rounded-lg hover:opacity-80 text-lg">
            <Link to={"/shop"}>Shop Now</Link>
          </button>
        </div>
    </div>
  );
};
