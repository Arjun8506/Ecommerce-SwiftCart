import React, { useState } from "react";
import contactBgImage from "../assests/background2.jpg";
import { useSendMessage } from "../hooks/UseSendMessage";

const Contact = () => {
  const { loading, error, sendMessage } = useSendMessage();

  const [formData, setformData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChangeEvent = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(formData);
    await sendMessage(formData)
  };

  return (
    <section>
      <div
        className=" w-full min-h-screen bg-cover bg-center bg-no-repeat px-2 lg:px-5 py-24"
        style={{ backgroundImage: `url(${contactBgImage})` }}
      >
        <h1 className="font-bold text-start text-white lg:text-center  my-5 text-xl capitalize">
          Contact Us via this form
        </h1>
        <form 
        onSubmit={handleSubmitForm}
        className="w-full  min-h-fit lg:w-[60%] lg:mx-auto flex flex-col gap-4 items-center">
          <input
            type="text"
            id="name"
            placeholder="Jhon Doe"
            className="w-full py-1 px-2 rounded-lg"
            value={formData.name}
            onChange={handleChangeEvent}
          />
          <input
            type="email"
            id="email"
            placeholder="johndoe@gmail.com"
            className="w-full py-1 px-2 rounded-lg"
            value={formData.email}
            onChange={handleChangeEvent}
          />
          <textarea
            id="message"
            className="w-full h-40  py-1 px-2  rounded-lg resize-none"
            placeholder="Message Here...."
            value={formData.message}
            onChange={handleChangeEvent}
          ></textarea>
          <button
            className=" w-full capitalize  btn bg-primary text-white disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending" : "send Message"}
          </button>
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
      </div>
    </section>
  );
};

export default Contact;
