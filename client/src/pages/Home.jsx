import React from "react";
import { HeroSection } from "../components/HeroSection";
import Products from "../components/Products";
import { Link } from "react-router-dom";

const Home = () => {

  const imageData = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PC_WF/WF1-186-116._SY116_CB636048992_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/186x116_Home_furnishings_2._SY116_CB584596691_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/186x116_Home_storage_1._SY116_CB584596691_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/186x116_Home_lighting_2._SY116_CB584596691_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08345R1ZW._SY116_CB667322346_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08RDL6H79._SY116_CB667322346_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B07G5J5FYP._SY116_CB667322346_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-1-186-116._SY116_CB636110853_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-4-186-116._SY116_CB636110853_.jpg",
  ]

  return (
    <div className="bg-gray-900 w-full min-h-screen text-white">
      <HeroSection />
      <Products />

      <h1 className="text-xl my-5 px-2 underline font-extrabold">More Products From Us</h1>

      <div className="w-full min-h-screen grid grid-cols-3 gap-4 p-2">
      {imageData.map((img, index) => (
        <Link to={"/"} key={index}>
          <div className="w-full h-full rounded-lg border-2 border-black overflow-hidden">
            <img src={img} alt="" className="w-full h-full object-cover hover " />
          </div>
        </Link>
      ))}

      </div>

    </div>
  );
};

export default Home;
