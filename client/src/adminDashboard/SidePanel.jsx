import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import {
  MdDashboard,
  MdOutlineRedeem,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { FaUserSecret, FaStreetView } from "react-icons/fa";

const SidePanel = () => {
  const { authUser } = useAuthContext();
  const windowsize = window.innerWidth

  useEffect(() => {
    
    const resize = () => {
    }

  }, [window.innerWidth])
  

  return (
    <>

    <div className="w-full fixed  bg-slate-200 flex justify-between items-center py-5 mt-20 px-5 bottom-0">
        <h1 className=" text-xl font-bold uppercase text-center">
        👋 { windowsize < 1024 ? "" : authUser.fullname}
      </h1>
      <ul className="flex gap-4 ">
        <Link to={"/admin/dashboard"}>
          <li className='flex items-center gap-1'>
            <MdDashboard /> {windowsize < 1024 ? "" : <span>Dashbord</span>}
          </li>
        </Link>
        <Link to={"/admin/create"}>
          <li className='flex items-center gap-1'>
            <IoIosCreate /> {windowsize < 1024 ? "" : <span>Create Product</span>}
          </li>
        </Link>
        <Link to={"/admin/products"}>
          <li className='flex items-center gap-1'>
            <MdProductionQuantityLimits />  {windowsize < 1024 ? "" : <span>Products</span>}
          </li>
        </Link>
        <Link to={"/admin/orders"}>
          <li className='flex items-center gap-1'>
            <MdOutlineRedeem />  {windowsize < 1024 ? "" : <span>Orders</span>}
          </li>
        </Link>
        <Link to={"/admin/users"}>
          <li className='flex items-center gap-1'>
            <FaUserSecret />  {windowsize < 1024 ? "" : <span>Users</span>}
          </li>
        </Link>
        <Link to={"/admin/reviws"}>
          <li className='flex items-center gap-1'>
            <FaStreetView />  {windowsize < 1024 ? "" : <span>Reviws</span>}
          </li>
        </Link>
      </ul>
    </div>

    </>
  );
};

export default SidePanel;
