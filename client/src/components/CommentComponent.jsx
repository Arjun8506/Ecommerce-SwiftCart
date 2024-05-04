import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useAuthContext } from "../context/AuthContext";
import { useSendReview } from "../hooks/useSendReview";

const CommentComponent = ({ product }) => {

    const { authUser } = useAuthContext()
    
    const { sendReview, loading, error } = useSendReview()

    const [review, setreview] = useState({
      productId: "",
      ratings: 0,
      comment: "",
      userId: authUser?._id
    })
    useEffect(() => {
      const setproductIdvalue = () => {
        setreview({ ...review, productId: product })
      }
      setproductIdvalue()
    }, [product])

    const handleRating = (ratingValue) => {
        setreview({ ...review, ratings: ratingValue });
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(review);
        await sendReview(review)
    }

  return (
    <div className="w-full h-full border-2 border-slate-400 my-5 px-4 py-5 rounded-lg flex flex-col gap-3">
      <h1 className=" font-semibold text-lg">Review Here: </h1>
      
      <form className="w-full relative" onSubmit={handleSubmit}>
       
        <div className="rating rating-lg rating-half mb-2">
          <input type="radio" name="rating-10" className="rating-hidden" />
          <input
            type="radio"
            name="rating-10"
            className="bg-yellow-500 mask mask-star-2 mask-half-1"
            onClick={() => handleRating(0.5)}
            />
          <input
            type="radio"
            name="rating-10"
            className="bg-yellow-500 mask mask-star-2 mask-half-2"
            onClick={() => handleRating(1)}
            />
          <input
            type="radio"
            name="rating-10"
            className="bg-yellow-500 mask mask-star-2 mask-half-1"
            onClick={() => handleRating(1.5)}
            />
          <input
            type="radio"
            name="rating-10"
            className="bg-yellow-500 mask mask-star-2 mask-half-2"
            onClick={() => handleRating(2)}
            />
          <input
            type="radio"
            name="rating-10"
            className="bg-yellow-500 mask mask-star-2 mask-half-1"
            onClick={() => handleRating(2.5)}
            />
          <input
            type="radio"
            name="rating-10"
            className="bg-yellow-500 mask mask-star-2 mask-half-2"
            onClick={() => handleRating(3)}
            />
          <input
            type="radio"
            name="rating-10"
            className="bg-yellow-500 mask mask-star-2 mask-half-1"
            onClick={() => handleRating(3.5)}
            />
          <input
            type="radio"
            name="rating-10"
            className="bg-yellow-500 mask mask-star-2 mask-half-2"
            onClick={() => handleRating(4)}
            />
          <input
            type="radio"
            name="rating-10"
            className="bg-yellow-500 mask mask-star-2 mask-half-1"
            onClick={() => handleRating(4.5)}
            />
          <input
            type="radio"
            name="rating-10"
            className="bg-yellow-500 mask mask-star-2 mask-half-2"
            onClick={() => handleRating(5)}
            />
        </div>

        <textarea
          className="textarea bg-slate-300 resize-none w-full h-32 rounded-lg"
          id="comment"
          placeholder="Comment Here...."
          value={review.comment}
          onChange={(e) => setreview({ ...review, comment: e.target.value })}
        ></textarea>
        <button className="btn bg-black rounded-lg text-white absolute top-14 right-2">
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default CommentComponent;
