import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setauthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  const updateUser = (updatedUserData) => {
    setauthUser({ ...authUser, ...updatedUserData });
  };

  return <AuthContext.Provider value={{ authUser, setauthUser, updateUser }}>{children}</AuthContext.Provider>;
};
