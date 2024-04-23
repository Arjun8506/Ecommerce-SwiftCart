import React from "react";

const Card = ({ product }) => {
  return (
      <div className="card w-[80%] glass rounded-lg overflow-hidden  mx-auto mb-10 mt-10">
        <figure>
          <img src={product.img} alt="car!" />
        </figure>
        <div className="py-2 px-4 bg-orange-500">
          <h2 className="card-title">{product.name}</h2>
          <p className="text-base">Price: {product.price}</p>
          <p className="text-xs">
            {product.description}
            <button>Read More</button>
          </p>
          <p className="font-bold">Rating: ♣ ♣ ♣ ♣ ♠</p>
          <div className="card-actions justify-start mt-2">
            <button className="btn bg-orange-400 text-white">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
  );
};

export default Card;
