import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCards } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import slide1 from "../assests/slide1.jpg";
import slide2 from "../assests/slide2.jpg";
import slide3 from "../assests/slide3.jpg";
import slide4 from "../assests/slide4.jpg";
import mobileslide1 from "../assests/mobileslide1.jpg";
import mobileslide2 from "../assests/mobileslide2.jpg";
import mobileslide3 from "../assests/mobileslide3.jpg";
import mobileslide4 from "../assests/mobileslide4.jpg";

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
    <div className="max-w-full h-[100vh] bg-gray-100/50">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        grabCursor={false}
        pagination={true}
        modules={[EffectCards, Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 4000 }}
      >
        <SwiperSlide>
          <div className="w-full h-screen overflow-hidden relative">
            <img
              src={windowSize < 768 ? mobileslide1 : slide1}
              alt=""
              className="w-full h-full object-cover"
            />

            <div className="absolute top-0 left-0 w-full h-screen bg-black/60 text-orange-500 flex items-center justify-center px-5 text-center">
                <h1 className="h1inswiper text-2xl shadow-2xl shadow-orange-100">Discover the joy of shopping online, where every click opens up a world of possibilities.</h1>
            </div>

          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-screen overflow-hidden relative">
            <img
              src={windowSize < 768 ? mobileslide2 : slide2}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-screen bg-black/60 text-orange-500 flex items-center justify-center px-5 text-center">
                <h1 className="h1inswiper text-2xl shadow-2xl shadow-orange-100">Transform your shopping experience from mundane to marvelous, one click at a time.</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-screen overflow-hidden relative">
            <img
              src={windowSize < 768 ? mobileslide3 : slide3}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-screen bg-black/60 text-orange-500 flex items-center justify-center px-5 text-center">
                <h1 className="h1inswiper text-2xl shadow-2xl shadow-orange-100">Elevate your style, elevate your shopping experience. Welcome to a world of endless inspiration.</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-screen overflow-hidden relative">
            <img
              src={windowSize < 768 ? mobileslide4 : slide4}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-screen bg-black/60 text-orange-500 flex items-center justify-center px-5 text-center">
                <h1 className="h1inswiper text-2xl shadow-2xl shadow-orange-100">Let your imagination roam free as you explore our curated collection of must-have items.</h1>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
