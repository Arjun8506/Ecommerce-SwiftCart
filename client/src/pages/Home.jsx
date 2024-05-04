import React from "react";
import { HeroSection } from "../components/HeroSection";
import Products from "../components/Products";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="w-full min-h-screen bg-slate-100">
      <HeroSection />
      <Products />

    </div>
  );
};

export default Home;
