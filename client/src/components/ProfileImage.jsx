import React from "react";
import { useAuthContext } from "../context/AuthContext";

const ProfileImage = () => {

    const { authUser } = useAuthContext();

  return (
    <>
      <img
        src={authUser.profilePic}
        alt="profilepic"
        className="w-20 h-20 rounded-full border-2 object-cover"
      />
    </>
  );
};

export default ProfileImage;
