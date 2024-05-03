import React from "react";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const { addToCart } = useCartContext();

  const handleAddToCartFunction = (product) => {
    addToCart(product);
  };

  return (
    <div className="card w-full h-full bg-white rounded-lg overflow-hidden  mx-auto mb-10">
      <div>
        <img
          src={product.images[0]}
          alt="car!"
          className="w-full h-full object-cover aspect-square"
        />
      </div>
      <div className="w-full h-full p-1 pt-2 px-2 flex flex-col justify-around">
        <Link to={`/product/${product._id}`}>
        <h2 className="font-extrabold ">{product.name}</h2>
        </Link>
        <p className="text-sm font-semibold">Price: {product.price}</p>
        <p>⭐⭐⭐⭐⭐</p>
        <div className=" w-full my-2">
          <button
            className="p-2 w-full text-white bg-orange-600 rounded-lg hover:opacity-80 mx-auto text-sm font-bold"
            onClick={() => handleAddToCartFunction(product)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
