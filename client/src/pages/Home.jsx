import React, { useEffect } from "react";
import { HeroSection } from "../components/HeroSection";
import Products from "../components/Products";
import { Link } from "react-router-dom";
import { useGetAllNews } from "../hooks/usegetAllNews";

const Home = () => {
  const { getAllNews, news } = useGetAllNews();
  useEffect(() => {
    const fetchData = async () => {
      await getAllNews();
    };
    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-100" >
      <HeroSection />
      <Products />

      <div className="w-full h-64 shadow-xl flex items-center justify-center rounded-none bg-center bg-cover bg-no-repeat"
      style={{backgroundImage: `url(${news[0]?.image})` }}
      >
        <div className=" w-full h-fit px-4 flex justify-start items-end" >
          <div>
            <Link to={"/news"} className=" w-full">
            <button className="btn btn-primary w-fit mt-4 text-white">Read More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
