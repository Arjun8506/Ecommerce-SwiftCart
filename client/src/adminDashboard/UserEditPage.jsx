import React, { useEffect, useState } from "react";
import SidePanel from "./SidePanel";
import { useEditUser } from "../hooks/useEditUser";
import { useGetSpecificUser } from "../hooks/useGetSpecificUser";
function extractIdFromUrl(url) {
  const regex = /\/([a-zA-Z0-9]+)\/?$/;
  var match = regex.exec(url);
  return match ? match[1] : null;
}

const UserEditPage = () => {
  const { getSpecificUser, user } = useGetSpecificUser();
  const [selectedRole, setSelectedRole] = useState("choose");

  const [editFormData, seteditFormData] = useState({
    isAdmin: selectedRole === "Admin" ? true : false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const url = window.location.href;
      const id = extractIdFromUrl(url);
      if (id) {
        await getSpecificUser(id);
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedRole(value);
    seteditFormData({ isAdmin: value === "Admin" ? true : false });
  };

  const { loading, error, editUser } = useEditUser();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(editFormData);
    await editUser(user?._id, editFormData);
  };

  return (
    <div className="w-full min-h-screen py-24 bg-slate-100">
      <SidePanel />
      <div className="w-full min-h-screen px-2 lg:px-5">
        <h1 className=" text-center font-bold text-black capitalize">
          Edit User to admin || and || admin to user
        </h1>
        <div className=" w-full lg:w-[80%] mx-auto h-fit gap-4 py-5 flex flex-col lg:flex-row items-center">
          <div className="w-[40%]">
            <img
              src={user?.profilePic}
              alt=""
              className="w-[80%] h-full rounded-full"
            />
          </div>
          <div className="">
            <h1 className=" font-semibold uppercase text-black mb-2">
              User Info:{" "}
            </h1>
            <p className="">
              User Id: <span className=" font-bold">{user?._id}</span>
            </p>
            <p className="">
              User Name:{" "}
              <span className=" font-bold capitalize">{user?.fullname}</span>
            </p>
            <p className="">
              User Email: <span className=" font-bold">{user?.email}</span>
            </p>
            <p className="">
              User:{" "}
              <span className=" font-bold">
                {user?.isAdmin === true ? "Admin" : "User"}
              </span>
            </p>
            <form
              className=" flex flex-col gap-4 w-full mt-4"
              onSubmit={handleFormSubmit}
            >
              <select
                className="select select-bordered select-md w-full max-w-xs"
                value={selectedRole.isAdmin}
                onChange={handleSelectChange}
              >
                <option disabled value={"choose"}>
                  Select Admin Module
                </option>
                <option>Admin</option>
                <option>User</option>
              </select>
              <button className="btn bg-black text-white uppercase w-full">
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
