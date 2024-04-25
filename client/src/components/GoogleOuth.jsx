import React, { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../firebase";

const GoogleOuth = () => {
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  const loginWithGoogle = async () => {
    try {
      setloading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      console.log(result);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error.message);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-primary w-full my-4 text-lg text-white"
      onClick={loginWithGoogle}
    >
      Continue With Google
    </button>
  );
};

export default GoogleOuth;
