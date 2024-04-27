import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import { useAuthContext } from "./context/AuthContext";
import Cart from "./pages/Cart";
import CreateProduct from "./pages/CreateProduct";

const App = () => {
  const { authUser } = useAuthContext();

  console.log(authUser);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/cart"
          element={authUser ? <Cart /> : <Navigate to={"/login"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {authUser?.isAdmin === true && (
          <Route path="/isadmin/create" element={<CreateProduct />} />
        )}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
