import React, { useEffect, useState } from "react";
import { useGetAllProducts } from "../hooks/UseGetAllProducts";
import Card from "../components/Card";

const Shop = () => {
  const { loading, error, getAllProducts, products } = useGetAllProducts();

  useEffect(() => {
    async function fetchData() {
      await getAllProducts();
    }
    fetchData();
  }, []);

  const [isVisible, setisVisible] = useState(false);

  const toggleSortMenu = () => setisVisible(!isVisible);

  return (
    <div className="w-full min-h-screen pt-28 pb-10 px-2 bg-slate-100">
      <div className="flex items-center justify-between pb-6">
        <h1 className=" text-xl font-bold">Latest Products : </h1>

        <div className="">
          <div
            tabIndex={0}
            className="py-1 px-2 rounded-lg text-white hover:opacity-90 relative bg-orange-500"
            onClick={toggleSortMenu}
          >
            Sort ⬇
          </div>

          {isVisible && (
            <ul
              tabIndex={0}
              className="absolute right-0 z-[1] px-5 py-2 drop-shadow-xl bg-orange-500 text-white w-30 flex flex-col gap-1 items-center rounded-lg"
            >
              <li>Men Cloths</li>
              <li>Female Cloths</li>
              <li>Children Cloths</li>
              <li>SmartPhones</li>
              <li>Laptops</li>
            </ul>
          )}
        </div>
      </div>

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
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 px-2">
          {products?.length > 10
            ? products.map((product, index) => (
                <div key={index}>
                  <Card product={product} />
                </div>
              ))
            : products.map((product, index) => (
                <div key={index} className="h-72">
                  <Card product={product} />
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
