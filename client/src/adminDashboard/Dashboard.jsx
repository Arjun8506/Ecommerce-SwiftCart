import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import SidePanel from "./SidePanel";
import { useCountContext } from "../context/CountContext";
import { useGetAllUsers } from "../hooks/useAllUsers";
import { useGetAllProducts } from "../hooks/UseGetAllProducts";

const Dashboard = () => {
  const { authUser } = useAuthContext();
  const { count, setCount } = useCountContext();

  const { users, getAllUsers } = useGetAllUsers();
  const { products, getAllProducts } = useGetAllProducts();

  useEffect(() => {
    async function fetchdata() {
      await getAllUsers();
      await getAllProducts();
    }
    fetchdata();
  }, []);
  
  useEffect(() => {
    setCount(prevCount => ({
      ...prevCount,
      product: products.length,
      user: users.length
    }));
  }, [products.length, users.length]);
  

  return (
    <section>
      <SidePanel />
      <div className="w-full min-h-screen pt-24 bg-slate-100 flex items-center">
        <div className="w-full min-h-screen rounded-l-md px-5">
          <div className="w-full h-fit bg-orange-500 flex items-center flex-col py-1 text-white">
            <h1>Total Sale Amount : </h1>
            <p>$14,200,528</p>
          </div>
          <div className="w-full h-fit flex items-center justify-around py-4">
            <Link to={"/admin/products"}>
              <div className="w-24 h-24 bg-purple-500 hover:bg-cyan-600 text-white rounded-full flex flex-col items-center justify-center transition-all ease-in-out">
                <h2>Products</h2>
                <h2>{count?.product}</h2>
              </div>
            </Link>
            <Link to={"/admin/orders"}>
              <div className="w-24 h-24 bg-purple-500 hover:bg-cyan-600 text-white rounded-full flex flex-col items-center justify-center transition-all ease-in-out">
                <h2>Users</h2>
                <h2>{count?.user}</h2>
              </div>
            </Link>
            <Link to={"/admin/users"}>
              <div className="w-24 h-24 bg-purple-500 hover:bg-cyan-600 text-white rounded-full flex flex-col items-center justify-center transition-all ease-in-out">
                <h2>Orders</h2>
                <h2>{count?.order}</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
