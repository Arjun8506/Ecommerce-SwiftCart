import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useGetAllProducts } from "../hooks/UseGetAllProducts";
import { Link } from "react-router-dom";

const Products = () => {
  const { loading, error, getAllProducts, products } = useGetAllProducts();

  useEffect(() => {
    async function fetchData() {
      await getAllProducts();
    }
    fetchData();
  }, []);


  return (
    <>
      <h1 className="py-5 px-2 lg:px-5 font-extrabold capitalize text-xl">
        Shoping Items
      </h1>
      {error ? (
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
        ""
      )}

      {loading ? (
        <p className="mb-5 text-center text-xl">Loading</p>
      ) : (
        <>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-2 lg:px-5">
          {products?.length > 10
            ? products.slice(0, 10).map((product, index) => (
              <div key={index}>
                  <Card product={product} />
                </div>
              ))
            : products.map((product, index) => (
                <div key={index} className="">
                  <Card product={product} />
                </div>
              ))}
        </div>
        <div className="w-full h-fit flex items-center justify-center py-5">
        <Link to={"/shop"}>
              <button className="btn bg-orange-500 text-white w-fit capitalize ">View All Products</button>
        </Link>
        </div>

  </>
      )}
    </>
  );
};

export default Products;
