import React, { useEffect, useRef, useState } from "react";
import SidePanel from "./SidePanel";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";
import { useCreateNews } from "../hooks/useCreateNews";

const AdminCreateNews = () => {
  const fileref = useRef(null);
  const [file, setfile] = useState(null);
  const [fileUploadPerc, setfileUploadPerc] = useState(0);
  const [uploadError, setuploadError] = useState(null);
  const [formData, setformData] = useState({});
  const { loading, error, createNews } = useCreateNews();

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

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
            image: downloadURL,
          });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createNews(formData)
  }

  return (
    <div className=" w-full min-h-screen">
      <SidePanel />
      <div className="w-full min-h-screen py-24 px-2 lg:px-5 bg-slate-100">
        <img
          src={formData.profilePic}
          alt=""
          className=" w-full h-72 rounded-lg object-cover"
        />
        {fileUploadPerc !== 0 && (
          <p className="text-green-500 font-semibold text-center py-4">
            {fileUploadPerc}
          </p>
        )}
        {uploadError && (
          <p className="text-red-500 font-semibold py-4 text-center">
            {uploadError}
          </p>
        )}
        <div className="w-full my-5 flex items-center justify-center">
          <div className="w-[90%] ">
            <form className="flex flex-col gap-2 lg:w-[60%] mx-auto" onSubmit={handleSubmit}>
              <input
                type="file"
                ref={fileref}
                id=""
                className=" px-auto"
                onChange={(e) => setfile(e.target.files[0])}
              />
              <input
                type="text"
                id="highlight"
                placeholder="Highlight Goes Here...."
                className=" py-2 px-4 rounded-lg border-2 border-black"
                value={formData.highlight}
                onChange={handleChange}
              />
              <textarea id="details" className="py-2 px-4 rounded-lg border-2 border-black w-full h-52 resize-none" placeholder="Details Goes Here...."
              value={formData.details}
              onChange={handleChange}
              ></textarea>
              <button
                className="btn bg-orange-500 text-white w-full uppercase disabled:opacity-50 hover:opacity-90"
                disabled={loading}
              >
                {loading ? "Creating...." : "CREATE NEWS"}
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
    </div>
  );
};

export default AdminCreateNews;
