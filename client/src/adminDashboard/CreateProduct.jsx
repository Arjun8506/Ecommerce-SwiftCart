import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { FaPlus } from "react-icons/fa";
import app from "../../firebase";
import { useCreateProduct } from "../hooks/useCreateProduct";
import SidePanel from "./SidePanel";

const CreateProduct = () => {
  const { authUser } = useAuthContext();
  const { loading, error, createProduct } = useCreateProduct();

  const [availability, setAvailability] = useState("in stock");

  const handleCheckboxChange = (e) => {
    setAvailability(e.target.value);
  };

  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    const newTags = e.target.value.split(",").map((tag) => tag.trim());
    setTags(newTags);
  };

  const [files, setfiles] = useState([]);
  const fileref = useRef();
  const [imageURLs, setimageURLs] = useState([]);

  const [formData, setformData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    availability: [],
    quantity: "",
    images: [],
    tags: [],
  });

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length < 11) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setimageURLs(imageURLs.concat(urls));
      });
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          setloading(false);
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  useEffect(() => {
    setformData({
      ...formData,
      images: imageURLs,
      availability: availability,
      tags: tags,
    });
  }, [imageURLs, availability, tags]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    console.log(formData);
    await createProduct(formData)
  };

  return (
    <section>
      <SidePanel />
      <div className="w-full min-h-screen pt-24 px-5 pb-20">
        <p className="font-semibold text-xl text-center">Create Product Here</p>

        <form
          className=" w-[80%] flex flex-col gap-2 py-5 mx-auto"
          onSubmit={handleCreateProduct}
        >
          <input
            type="file"
            id="post"
            ref={fileref}
            hidden
            multiple
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files);
              setfiles([...files, ...selectedFiles]);
            }}
          />
          <input
            type="text"
            id="name"
            placeholder="Product Name"
            className="w-full border-2 border-black px-2 py-1 rounded-lg"
            value={formData.name}
            onChange={(e) => setformData({ ...formData, name: e.target.value })}
          />
          <textarea
            id="name"
            placeholder="Product Description"
            rows={5}
            className="w-full border-2 border-black px-2 py-1 rounded-lg resize-none"
            value={formData.description}
            onChange={(e) =>
              setformData({ ...formData, description: e.target.value })
            }
          />
          <input
            type="number"
            id="prize"
            placeholder="Product Prize"
            className="w-full border-2 border-black px-2 py-1 rounded-lg"
            value={formData.price}
            onChange={(e) =>
              setformData({ ...formData, price: e.target.value })
            }
          />
          <input
            type="text"
            id="category"
            placeholder="Product Category"
            className="w-full border-2 border-black px-2 py-1 rounded-lg"
            value={formData.category}
            onChange={(e) =>
              setformData({ ...formData, category: e.target.value })
            }
          />
          <input
            type="text"
            id="brand"
            placeholder="Product Brand"
            className="w-full border-2 border-black px-2 py-1 rounded-lg"
            value={formData.brand}
            onChange={(e) =>
              setformData({ ...formData, brand: e.target.value })
            }
          />
          <div className=" flex items-center gap-2">
            <h1 className=" font-extralight ">Availability: </h1>
            <div className=" text-sm flex gap-1">
              <label>
                <input
                  type="checkbox"
                  value="in stock"
                  checked={availability === "in stock"}
                  onChange={handleCheckboxChange}
                />{" "}
                In Stock
              </label>
              <label>
                <input
                  type="checkbox"
                  value="out of stock"
                  checked={availability === "out of stock"}
                  onChange={handleCheckboxChange}
                />{" "}
                Out of Stock
              </label>
            </div>
          </div>

          <input
            type="number"
            id="quantity"
            placeholder="Product Quantity"
            className="w-full border-2 border-black px-2 py-1 rounded-lg"
            value={formData.quantity}
            onChange={(e) =>
              setformData({ ...formData, quantity: e.target.value })
            }
          />

          <div className=" border-[1px] border-zinc-400 rounded-lg">
            <div
              onClick={() => fileref.current.click()}
              className=" flex gap-2 items-center justify-center py-4"
            >
              <FaPlus /> Choose Products Images
            </div>
          </div>

          <button
            onClick={handleImageSubmit}
            type="button"
            className="w-full uppercase btn-primary my-4 text-white btn hover:opacity-90 font-bold "
          >
            Upload To Preview
          </button>

          <div className=" flex items-center gap-2">
            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              id="tags"
              value={tags.join(", ")}
              onChange={handleInputChange}
              placeholder="Enter tags separated by commas"
              className="w-full border-2 border-black px-2 py-1 rounded-lg"
            />
          </div>

          {imageURLs.length > 0 && (
            <div className="">
              <p>Preview Products Images: </p>
              <div className=" w-full h-fit grid grid-cols-2 gap-2">
                {imageURLs?.map((img) => (
                  <img
                    src={img}
                    key={img}
                    alt=""
                    className="w-full h-full object-contain aspect-square"
                  />
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn bg-orange-500 my-4 text-white uppercase"
            disabled={loading}
          >
            {loading ? "Creating" : "Create Product"}
          </button>
        </form>
        {error ? <p>{error}</p> : ""}
      </div>
    </section>
  );
};

export default CreateProduct;
