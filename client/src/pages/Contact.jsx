import React from "react";
import contactBgImage from "../assests/background2.jpg";

const Contact = () => {
  return (
    <section>
      <div
        className=" w-full min-h-screen bg-cover bg-center bg-no-repeat px-2 lg:px-5 py-24"
        style={{ backgroundImage: `url(${contactBgImage})` }}
      >
          <h1 className="font-bold text-start text-white  my-5 text-xl capitalize">Contact Us via this form</h1>
          <form className="w-full  min-h-fit lg:w-[60%] flex flex-col gap-4 items-center">
            <input type="text" id="name" placeholder="Jhon Doe"
            className="w-full py-1 px-2 rounded-lg"
            />
            <input type="email" id="email" placeholder="johndoe@gmail.com"
            className="w-full py-1 px-2 rounded-lg"
            />
            <textarea
              id="message"
              className="w-full h-40  py-1 px-2  rounded-lg resize-none"
              placeholder="Message Here...."
            ></textarea>
            <button className=" w-full capitalize  btn bg-primary text-white">send message</button>
          </form>
      </div>
    </section>
  );
};

export default Contact;
