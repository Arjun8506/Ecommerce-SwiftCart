import React from "react";
import { useAuthContext } from "../context/AuthContext";
import getLocation from "../utils/FetchingLocation";

const Profile = () => {
  const { authUser } = useAuthContext();

  const gettingCueentLocation = () => {
    getLocation();
  };

  return (
    <section>
      <div className="w-full min-h-screen px-2 pt-24 flex flex-col items-center">
        <h1 className="my-2 uppercase font-bold text-xl">Profile</h1>
        <img
          src={authUser.profilePic}
          alt="profilepic"
          className="w-20 h-20 rounded-full border-2 object-cover"
        />
        <h1>
          Hi,{" "}
          <span className="text-lg font-semibold capitalize">
            {authUser.fullname}
          </span>
        </h1>
        <div className="w-full flex flex-col gap-2 my-5">
          <button className="btn bg-orange-500 text-white w-full mb-2 uppercase"
          onClick={gettingCueentLocation}
          >
            Current Location
          </button>
          <div className="w-[90%] mx-auto ">
            <h2 className="mb-2">Add Communication Address: </h2>
            <form className="flex flex-col gap-2">
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Address" />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="City" />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="State" />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="number" className="grow" placeholder="Pincode" />
              </label>
              <button className="btn btn-primary text-lg ">Add Address</button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full min-h-fit px-2">
      <h1 className="my-2 uppercase font-bold text-xl">Orders History And Ratings -- </h1>

      </div>
    </section>
  );
};

export default Profile;
