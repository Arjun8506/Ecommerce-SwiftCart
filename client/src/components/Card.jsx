import React, { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useGetProductReviews } from "../hooks/useGetProductReview";

const Card = ({ product }) => {
  const { authUser } = useAuthContext()
  const { addToCart } = useCartContext();

  const [cartItemDetails, setcartItemDetails] = useState({
    userid: authUser?._id,
    _id: product._id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    quantity: 1
  })

  const handleAddToCartFunction = (cartItemDetails) => {
    addToCart(cartItemDetails);
  };

    // getting product reviews
    const { productReviews, getProductReviews } = useGetProductReviews();

    useEffect(() => {
      const fetchData = async () => {
          await getProductReviews(product._id);
      };
      fetchData();
    }, []);

  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (productReviews && productReviews.length > 0) {
      const totalRatings = productReviews.reduce((acc, review) => acc + review.ratings, 0);
      const avgRating = totalRatings / productReviews.length;
      setAverageRating(avgRating);
    }else{
      setAverageRating("No Ratings")
    }
  }, [productReviews]);

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
        <p className="text-sm font-semibold">Price:{" "} ₨{product.price}</p>
        <h1 className="text-green-500 flex items-center gap-1 ">
              <span className=" text-yellow-300">{"⭐".repeat(Math.round(averageRating))}</span>
            </h1>
        <div className=" w-full my-2">
          {authUser ? (
          <button
            className="p-2 w-full text-white bg-orange-600 rounded-lg hover:opacity-80 mx-auto text-sm font-bold"
            onClick={() => handleAddToCartFunction(cartItemDetails)}
          >
            Add To Cart
          </button>
          ) : <button
          className="p-2 w-full text-white bg-orange-600 rounded-lg hover:opacity-80 mx-auto text-sm font-bold"
          onClick={() => alert("First Login")}
        >
          Add To Cart
        </button>}
        </div>
      </div>
    </div>
  );
};

export default Card;
