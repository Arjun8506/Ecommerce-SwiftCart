import React, { useEffect, useState } from "react";
import { useGetSpecificProduct } from "../hooks/useProductDetails";
import CommentComponent from "../components/CommentComponent";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";

function extractIdFromUrl(url) {
  const regex = /\/([a-zA-Z0-9]+)\/?$/;
  var match = regex.exec(url);
  return match ? match[1] : null; 
}

const ProductDetails = () => {
 const { authUser } = useAuthContext()
 
  const { loading, error, product, getSpecificProduct } =
    useGetSpecificProduct();

  useEffect(() => {
    const fetchData = async () => {
      const url = window.location.href;
      const id = extractIdFromUrl(url);
      if (id) {
        await getSpecificProduct(id);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }


  let top1images;
  let otherImages;

  if (product?.images?.length > 1) {
    top1images = product.images.slice(0, 2);
    otherImages = product.images.slice(2);
  } else {
    console.log("only 1 image");
  }

  const { addToCart } = useCartContext()

  const [cartItemDetails, setcartItemDetails] = useState({
    userid: authUser?._id,
    _id: product?._id,
    name: product?.name,
    price: product?.price,
    image: product?.images ? product.images[0] : null,
    quantity: 1
  })

  useEffect(() => {
    if (product) {
      setcartItemDetails(prevState => ({
        ...prevState,
        userid: authUser?._id,
        _id: product?._id,
        name: product?.name,
        price: product?.price,
        image: product?.images ? product.images[0] : null,
        quantity: 1
      }));
    }
  }, [product])
  

  const handleAddToCartFunction = (cartItemDetails) => {

    addToCart(cartItemDetails);
  };

  return (
    <section>
      <div className="w-full min-h-screen bg-slate-200 pt-24 px-2 lg:px-5">
        <div className="w-full flex gap-4 flex-col lg:flex-row items-start">
          <div className="w-full h-fit min-h-96 lg:h-screen flex items-center justify-around lg:items-start gap-2">
            <div className="w-[30%] h-fit lg:w-20 flex flex-col justify-between items-center my-auto gap-5">
              {otherImages?.map((img) => (
                <img
                  src={img}
                  key={img}
                  alt=""
                  className=" w-full lg:h-20 object-cover aspect-square rounded-lg"
                />
              ))}
            </div>
            <div className=" w-full lg:w-[70%] flex flex-col justify-between gap-2 my-auto">
              {top1images?.map((img) => (
                <img
                  src={img}
                  key={img}
                  alt=""
                  className=" w-[90%] lg:h-60 object-cover aspect-square rounded-lg"
                />
              ))}
            </div>
          </div>
          <div className="w-full min-h-fit flex flex-col gap-1 mt-5">
            <h1 className=" text-xl font-bold">{product.name}</h1>
            <h1 className="text-green-500 flex items-center gap-1 ">
              Ratings:
              <span>❤ ❤ ❤ ❤</span>
            </h1>
            <h1 className="font-semibold flex items-center gap-2">
              Price:
              <span>${product.price}</span>
            </h1>
            <p className=" text-sm flex items-center gap-2">
              <span>{product.description}</span>
            </p>

            {product?.tags?.map((tag) =>
              tag === "#Cloths" ? (
                <div className="flex items-start gap-2 my-2" key={tag}>
                  <p className="font-semibold text-lg">Size: </p>
                  <div className="join">
                    <input
                      className="join-item btn"
                      type="radio"
                      name="options"
                      aria-label="SM"
                      defaultChecked
                    />
                    <input
                      className="join-item btn"
                      type="radio"
                      name="options"
                      aria-label="MD"
                    />
                    <input
                      className="join-item btn"
                      type="radio"
                      name="options"
                      aria-label="LG"
                    />
                    <input
                      className="join-item btn"
                      type="radio"
                      name="options"
                      aria-label="XL"
                    />
                  </div>
                </div>
              ) : null
            )}

            <div className=" w-full join join-vertical">
              {loading ? "" : (
                <button className="btn join-item bg-orange-500 text-white"
                onClick={() => handleAddToCartFunction(cartItemDetails)}
                >
                  Add To Cart
                </button>
              )}
              <button className="btn join-item bg-black text-white">
                Buy Now
              </button>
            </div>

            {/* Comment section */}
            <CommentComponent product={product._id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
