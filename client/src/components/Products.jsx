import React, { useEffect, useState } from "react";
import bgimage from "../assests/productsBGimage.jpg";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Parallax, Pagination, Navigation } from "swiper/modules";
import { useGetAllProducts } from "../hooks/UseGetAllProducts";

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
  const { loading, error, getAllProducts, products } = useGetAllProducts();

  useEffect(() => {
    async function fetchData() {
      await getAllProducts();
    }
    fetchData();
  }, []);

  return (
    // <Swiper
    //   style={{
    //     "--swiper-navigation-color": "#fff",
    //     "--swiper-pagination-color": "#fff",
    //     backgroundImage: `url(${bgimage})`,
    //     backgroundPosition: "center",
    //     backgroundSize: "cover",
    //   }}
    //   speed={600}
    //     parallax={true}
    //     pagination={{
    //       clickable: true,
    //     }}
    //     navigation={true}
    //     modules={[Parallax, Pagination, Navigation]}
    // >
    //   {cardData.map((card, index) => (
    //     <SwiperSlide key={index}>
    //       <Card product={card} />
    //     </SwiperSlide>
    //   ))}
    // </Swiper>
    <>
      <h1 className="py-5 px-2 font-extrabold capitalize text-xl">
        Shooping Items
      </h1>
      {loading ? (
        <div
          role="alert"
          className="alert alert-error flex items-center justify-start text-white mt-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      ) : (
        <div className="w-full min-h-fit grid grid-cols-2 gap-2 p-2">
          {cardData.map((card, index) => (
            <Card product={card} key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
