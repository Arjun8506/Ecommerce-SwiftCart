import { createContext, useContext, useState } from "react";

const CountContext = createContext();

export const useCountContext = () => {
  return useContext(CountContext);
};

export const CountContextProvider = ({ children }) => {
  const [count, setCount] = useState({
    product: 0,
    user: 0,
    order: 0
  });

  return <CountContext.Provider value={{ count, setCount }}>{children}</CountContext.Provider>;
};
