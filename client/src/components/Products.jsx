import React, { useState } from "react";
import bgimage from "../assests/productsBGimage.jpg";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Parallax, Pagination, Navigation } from "swiper/modules";

const Products = () => {
  const [cardData, setcardData] = useState([
    {
      img: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400",
      name: "Female Dress",
      price: "$20",
      description:
        "Step up your style game with our premium branded drasses....",
    },
    {
      img: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=400",
      name: "Branded Phones",
      price: "$50",
      description:
        "Step up your style game with our premium branded phones....",
    },
    {
      img: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
      name: "Branded shoes",
      price: "$15",
      description: "Step up your style game with our premium branded shoes....",
    },
    {
      img: "https://images.pexels.com/photos/10143320/pexels-photo-10143320.jpeg?auto=compress&cs=tinysrgb&w=400",
      name: "Mens Cloth",
      price: "$10",
      description:
        "Step up your style game with our premium branded mens clothes....",
    },
  ]);

  return (
    <Swiper
      style={{
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
        backgroundImage: `url(${bgimage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
    >
      {cardData.map((card, index) => (
        <SwiperSlide key={index}>
          <Card product={card} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Products;
