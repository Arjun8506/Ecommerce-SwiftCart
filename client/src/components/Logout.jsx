import axios from "axios";
import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setauthUser } = useAuthContext();
  const navigate = useNavigate();

  const [error, seterror] = useState(null);

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/logout");

      if (res.data.success === false) {
        seterror(res.message);
        return;
      }

      localStorage.removeItem("chat-user");
      setauthUser(null);
      seterror(null);
      navigate("/");
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <>
      <button type="button"
      onClick={handleLogout}
      className="btn bg-orange-500 text-white w-full">
        Logout
      </button>
      {error ? (
        <p className="text-xs text-red-700 text-center">{error.message}</p>
      ) : (
        ""
      )}
    </>
  );
};

export default Logout;
