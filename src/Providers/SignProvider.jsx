import React, { useContext, createContext, useState } from "react";

export const UserDataContext = createContext();
export const UserDataContextProvider = createContext();
export const ProductsShowContext = createContext();
export const ProductsShowContextProvider = createContext();
export const FavoritesContext = createContext();
export const FavoritesContextProvider = createContext();

const SignProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <>
      <UserDataContext.Provider value={userData}>
        <UserDataContextProvider.Provider value={setUserData}>
          {children}
        </UserDataContextProvider.Provider>
      </UserDataContext.Provider>
    </>
  );
};

export const useUserData = () => useContext(UserDataContext);

export const useUserDataDispatcher = () => {
  //? Providers \\
  const setUserData = useContext(UserDataContextProvider);

  //? Handlers \\
  //! Handlers \\

  //? returned handlers for use \\
  return {
    setUserData,
  };
};

export default SignProvider;
