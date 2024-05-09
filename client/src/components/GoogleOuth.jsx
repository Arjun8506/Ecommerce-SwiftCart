import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const GoogleOuth = () => {
  const { setauthUser } = useAuthContext()
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()

  const loginWithGoogle = async () => {
    try {
      setloading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      
      const formData = {
        fullname: result.user.displayName,
        email: result.user.email,
        profilePic: result.user.photoURL,
      };

      const res = await axios.post("/api/auth/google", formData);

      if (res.data.success === false) {
          seterror(res.response.data.message);
          setloading(false);
          return;
      }

      localStorage.setItem("chat-user", JSON.stringify(res.data.user));
      setauthUser(res.data.user);

      setloading(false);
      seterror(null);
      navigate("/");
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error.message);
    }
  };



  return (
    <>
    <button
      type="button"
      className="btn btn-primary w-full my-4 text-lg text-white disabled:opacity-50"
      onClick={loginWithGoogle}
      disabled={loading}
      >
      {loading ? "Loading" : "Continue With Google"}
    </button>
      {error ? <p>{error}</p> : ""}

</>
  );
};

export default GoogleOuth;
