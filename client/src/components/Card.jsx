import React from "react";

const Card = ({ product }) => {

  return (
      <div className="card w-full h-full bg-white rounded-lg overflow-hidden  mx-auto mb-10">
        <div>
          <img src={product.img} alt="car!" className="" />
        </div>
        <div className="p-1 pt-2 px-2" >
          <h2 className="font-extrabold ">{product.name}</h2>
          <p className="text-sm font-semibold">Price: {product.price}</p>
          <p className="text-xs">
            {product.description}
            <button>Read More</button>
          </p>
          <p className="font-bold text-sm">Rating: ♣ ♣ ♣ ♣ ♠</p>
          <div className=" w-full mt-2">
            <button className="p-1 text-white bg-orange-600 rounded-lg hover:opacity-80 mx-auto text-sm font-bold">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
  );
};

export default Card;
