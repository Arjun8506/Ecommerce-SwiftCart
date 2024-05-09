import React, { useState } from "react";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { MdCancel } from "react-icons/md";
import axios from "axios"

const Cart = () => {
  const { authUser } = useAuthContext();
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCartContext();

  const totalAmount = cartItems.reduce(
    (total, cart) => total + cart.price * cart.quantity,
    0
  );

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const makePayment = async ()=>{
    try {
      setloading(true)
      const body = { totalAmount: totalAmount };

      console.log(body);

      const res = await axios.post("/api/payment/paynow", body)

      const order = res.data.order

      var options = {
        key: import.meta.VITE_RAZORPAY_API_KEY, 
        amount: order.amount,
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async function (response){
            const body = {...response, totalAmount: totalAmount}
            const res = await axios.post(`/api/payment/paymentverification/${authUser?._id}`, body)
            if (res.data.success === true) {
              localStorage.removeItem("cart")
              setloading(false)
              alert("Payment Successfull 😎")
              window.location.reload()
              
            }else{
              setloading(false)
              alert("Payment Failed!")
              window.location.reload()
            }
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#000000"
        }
    };
    const razor = new window.Razorpay(options)
    razor.on('payment.failed', function (response){
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
          });
          razor.open()
          
        } catch (error) {
          setloading(false)
          console.log(error);
        }
}


  return (
    <div className="w-full min-h-screen py-24 bg-slate-100 px-2 lg:px-5 relative">
      <h1 className=" font-bold text-xl mb-5">Cart Items</h1>
      {cartItems.length !== 0 ? (
        cartItems?.map((cart, index) =>
          cart.userid === authUser?._id ? (
            <div
              key={index}
              className="w-full h-fit border-2 py-2 px-4 mb-5 items-center flex flex-col gap-2"
            >
              <div className="w-full flex items-start gap-3">
                <img
                  src={cart.image}
                  className="w-20 h-20 rounded-lg border-2 border-slate-500"
                  alt=""
                />
                <div className="">
                  <h1 className="font-bold capitalize">{cart.name}</h1>
                  <p className=" text-sm font-semibold">
                    ₨ {cart.price * cart.quantity}
                  </p>
                </div>
              </div>
              <div className="w-full flex items-center justify-between">
                <div className=" flex items-center gap-1">
                  <button
                    onClick={() => decreaseQuantity(cart._id)}
                    className="bg-black py-1 px-2 text-white rounded-full"
                  >
                    -
                  </button>
                  <p>{cart.quantity}</p>
                  <button
                    onClick={() => increaseQuantity(cart._id)}
                    className="bg-black py-1 px-2 text-white rounded-full"
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn bg-black text-white"
                  onClick={() => removeFromCart(cart._id)}
                >
                  Remove From Cart
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center py-2">No Items</p>
          )
        )
      ) : (
        <p className=" text-center capitalize font-extrabold py-5">
          No Items In The CART
        </p>
      )}

      <div className="w-full h-fit border-t-2 border-black flex justify-around p-4 ">
        <div className="w-[50%] h-full">
          <h1 className="font-bold capitalize ">Total amount:</h1>
        </div>
        <div className="w-[50%] h-full">
          <h1 className="font-extrabold mb-2">₨ {totalAmount}</h1>
          {loading ? (
            <></>
          ) : (
            <button
            className="btn w-full bg-orange-500 text-white uppercase"
            onClick={makePayment}
          >
            Checkout
          </button>
          )}
        </div>
      </div>

      {error ? (
        <p className=" text-center text-red-500 font-semibold">😢 {error}</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
