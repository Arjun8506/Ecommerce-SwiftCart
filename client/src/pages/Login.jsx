import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import GoogleOuth from "../components/GoogleOuth";

const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { loading, error, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(formData);
  };

  return (
    <div className="pt-20 w-full min-h-screen px-2 pb-16">
      <div className="text-black flex flex-col items-center gap-2 py-5 w-full lg:w-[70%] mx-auto">
        <h1 className="font-bold text-xl">Welcome Back to SwiftCart!</h1>
        <p className="text-center">
          Log in to SwiftCart to access your account, track orders, and enjoy
          personalized offers. Forgot your password? Reset it easily. New here?
          Join us for a seamless shopping experience.
        </p>
      </div>

      <form className="flex flex-col gap-5 w-full lg:w-[70%] mx-auto" onSubmit={handleSubmit}>
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
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setformData({ ...formData, email: e.target.value })
            }
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
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setformData({ ...formData, password: e.target.value })
            }
          />
        </label>

        <button
          type="submit"
          className="btn bg-orange-700 text-white text-lg disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging...." : "Log In"}
        </button>
      <GoogleOuth />
      </form>

      {error ? (
        <div
          role="alert"
          className="alert alert-error flex items-center justify-start text-white mt-5"
        >
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
          <span>{error}</span>
        </div>
      ) : (
        ""
      )}


      <p className="text-sm text-center">
        Don't Have an Account?{" "}
        <Link to={"/register"} className="link link-primary">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
