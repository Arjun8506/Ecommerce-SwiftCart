import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const useEditUser = () => {
    const { updateUser } = useAuthContext() 
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const editUser = async (id, formData) => {
    const confirmed = window.confirm(
      "Are you sure you want to edit this user?"
    );

    if (confirmed) {
      setloading(true);
      try {
        const res = await axios.put(
          `http://localhost:3000/api/users/user/${id}`, formData
        );

        if (res.data.success === false) {
          seterror(res.response.data.message)
          setloading(false);
          return;
        }

        setloading(false);
        seterror(null);
        localStorage.setItem("chat-user", JSON.stringify(res.data.user));
        const updatedUserData = {
          profilePic: res.data.user.profilePic,
          isAdmin: res.data.user.isAdmin
        };
        updateUser(updatedUserData);
        window.location.reload();

      } catch (error) {
        setloading(false);
        seterror(error.message);
      }
    } else {
      alert("You Canceled!");
    }
  };

  return { loading, error, editUser };
};
