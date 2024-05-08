import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";
import { useEditUser } from "../hooks/useEditUser";
import { useGetAllUserOrders } from "../hooks/useGetUserOrders";

const Profile = () => {
  const { authUser } = useAuthContext();
  const fileref = useRef(null);
  const [file, setfile] = useState(null);
  const [fileUploadPerc, setfileUploadPerc] = useState(0);
  const [uploadError, setuploadError] = useState(null);
  const { orders, getAllUserOrders } = useGetAllUserOrders();

  useEffect(() => {
    const fetchData = async () => {
      await getAllUserOrders(authUser._id)
    }
    fetchData()
  }, [orders])
  

  const [formData, setformData] = useState({
  });

  const handleChange = (e) => {
      setformData({
        ...formData, [e.target.id]: e.target.value
      })
    }

  useEffect(() => {
    if (file) {
      handleUploadImage(file);
    }
  }, [file]);

  const handleUploadImage = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfileUploadPerc(progress);
      },
      (error) => {
        setuploadError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setformData({
            ...formData,
            profilePic: downloadURL,
          });
        });
      }
    );
  };

  //  Updating User
  const { loading, error, editUser } = useEditUser();
  const handleUserUpdate = async (e) => {
    e.preventDefault();
    console.log(formData);
    await editUser(authUser._id, formData);
  };

  return (
    <section>
      <div className="w-full min-h-screen px-2 pt-24 flex flex-col items-center">
        <h1 className="my-4 uppercase font-bold text-2xl">Profile</h1>
        <img
          src={formData?.profilePic || authUser.profilePic}
          alt="profilepic"
          onClick={() => fileref.current.click()}
          className="w-28 h-28 rounded-full border-2 object-cover"
        />
        {fileUploadPerc !== 0 && (
          <p className="text-green-500 font-semibold">{fileUploadPerc}</p>
        )}
        {uploadError && (
          <p className="text-red-500 font-semibold">{uploadError}</p>
        )}
        <h1>
          Hi,{" "}
          <span className="text-lg font-semibold capitalize">
            {authUser.fullname}
          </span>
        </h1>
        <div className="w-full my-5 flex items-center justify-center">
          <div className="w-[90%] ">
            <form
              className="flex flex-col gap-2 lg:w-[60%] mx-auto"
              onSubmit={handleUserUpdate}
            >
              <input
                type="file"
                ref={fileref}
                id=""
                hidden
                onChange={(e) => setfile(e.target.files[0])}
              />
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  className="grow"
                  id="email"
                  placeholder={authUser.email}
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  id="password"
                  placeholder="Password"
                  value={formData.passord}
                  onChange={handleChange}
                />
              </label>
              <button
                className="btn bg-orange-500 text-white w-full uppercase disabled:opacity-50 hover:opacity-90"
                disabled={loading}
              >
                {loading ? "Updating" : "Update profile"}
              </button>
            </form>

            {error ? (
              <div role="alert" className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Error! Task failed successfully.</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="w-full min-h-fit px-2 py-5 overflow-x-auto">
        <h1 className="my-2 uppercase font-bold text-xl">
          Orders History --{" "}
          <table className=" w-full my-2">
            <thead>
              <tr className=" text-sm">
                <th>Order Id</th>
                <th>Payment Id</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length > 0 ? orders.map((order) => (
                <tr key={order._id} className=" text-xs">
                  <td>{order.orderid}</td>
                  <td>{order.paymentid}</td>
                  <td>{order.amount}</td>
                </tr>
              )) : <tr>
                  <td colSpan={3}>No Previous Orders</td>
                </tr>}
            </tbody>
          </table>
        </h1>
      </div>
    </section>
  );
};

export default Profile;
