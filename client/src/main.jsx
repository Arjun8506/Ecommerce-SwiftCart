import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { CountContextProvider } from "./context/CountContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <CartContextProvider>
      <CountContextProvider>
        <App />
      </CountContextProvider>
    </CartContextProvider>
  </AuthContextProvider>
);
