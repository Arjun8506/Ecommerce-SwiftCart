import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import SidePanel from "./SidePanel";
import { useCountContext } from "../context/CountContext";
import { useGetAllUsers } from "../hooks/useAllUsers";
import { useGetAllProducts } from "../hooks/UseGetAllProducts";
import { useGetAllOrders } from "../hooks/useGetAllOrders";
import OrdersChart from "../components/OrdersChart";
import UsersChart from "../components/UsersChart";

const Dashboard = () => {
  const { authUser } = useAuthContext();
  const { count, setCount } = useCountContext();

  const { users, getAllUsers } = useGetAllUsers();
  const { products, getAllProducts } = useGetAllProducts();
  const { orders, getAllOrders } = useGetAllOrders();

  const [totalSaleAmount, setTotalSaleAmount] = useState(0);

  useEffect(() => {
    async function fetchdata() {
      await getAllUsers();
      await getAllProducts();
      await getAllOrders();
    }
    fetchdata();
  }, []);
  
  useEffect(() => {
    setCount(prevCount => ({
      ...prevCount,
      product: products.length,
      user: users.length,
      order: orders.length
    }));

    const totalAmount = orders.reduce((acc, order) => acc + order.amount, 0);
    setTotalSaleAmount(totalAmount);
  }, [products.length, users.length, orders.length]);
  
  // Calculate total sale amount

  return (
    <section>
      <SidePanel />
      <div className="w-full min-h-screen pt-24 bg-slate-100 flex items-center">
        <div className="w-full min-h-screen rounded-l-md ">
          <div className="w-full h-fit bg-orange-500 flex items-center flex-col py-1 text-white">
            <h1>Total Sale Amount : </h1>
            <p>₨ {totalSaleAmount}</p>
          </div>
          <div className="w-full h-fit grid grid-cols-3 gap-2 py-4 px-5">
            <Link to={"/admin/products"}>
              <div className="w-full bg-green-500 hover:opacity-50 text-white rounded-lg flex flex-col items-center justify-center transition-all ease-in-out py-5 text-lg">
                <h2>Products</h2>
                <h2>{count?.product}</h2>
              </div>
            </Link>
            <Link to={"/admin/users"}>
              <div className="w-full bg-yellow-500 hover:opacity-50 text-white rounded-lg flex flex-col items-center justify-center transition-all ease-in-out py-5 text-lg">
                <h2>Users</h2>
                <h2>{count?.user}</h2>
              </div>
            </Link>
            <Link to={"/admin/orders"}>
              <div className="w-full bg-blue-500 hover:opacity-50 text-white rounded-lg flex flex-col items-center justify-center transition-all ease-in-out py-5 text-lg">
                <h2>Orders</h2>
                <h2>{count?.order}</h2>
              </div>
            </Link>
          </div>

          <div className=" w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-5">
            <OrdersChart ordersData={orders} />
            <UsersChart usersData={users} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Dashboard;
