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
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import { useAuthContext } from "./context/AuthContext";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./adminDashboard/CreateProduct";
import Dashboard from "./adminDashboard/Dashboard";
import AdminProductPage from "./adminDashboard/AdminProductPage";
import AdminOrdersPage from "./adminDashboard/AdminOrdersPage";
import AdminUsersPage from "./adminDashboard/AdminUsersPage";
import AdminReviewsPage from "./adminDashboard/AdminReviewsPage";
import ProductEditPage from "./adminDashboard/ProductEditPage";
import UserEditPage from "./adminDashboard/UserEditPage";
import News from "./pages/News";
import AdminCreateNews from "./adminDashboard/AdminCreateNews";

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="w-full h-full">
      <div className="w-full max-w-[1500px] h-full mx-auto">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={ authUser ? (<Profile />) : <Navigate to={"/login"}  />} />
            <Route
              path="/cart"
              element={authUser ? <Cart /> : <Navigate to={"/login"} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            {authUser?.isAdmin === true && (
              <>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/create" element={<CreateProduct />} />
                <Route path="/admin/products" element={<AdminProductPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
                <Route path="/admin/reviws" element={<AdminReviewsPage />} />
                <Route path="/admin/create/news" element={<AdminCreateNews />} />
                <Route path="/admin/products/edit/:id" element={<ProductEditPage />} />
                <Route path="/admin/users/edit/:id" element={<UserEditPage />} />
              </>
            )}
          </Routes>
          {authUser?.isAdmin !== true && <Footer /> }
        </Router>
      </div>
    </div>
  );
};

export default App;
