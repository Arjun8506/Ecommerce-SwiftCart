import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartContextProvider = ({ children }) => {
  const [cartItems, setcartItems] = useState([]);

  const addToCart = (product) => {
    setcartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setcartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <>
      <CartContext.Provider
        value={{ cartItems, setcartItems, addToCart, removeFromCart }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};
