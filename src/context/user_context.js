import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { user, loginWithRedirect, logout } = useAuth0(); // destructuring all the state and functionality from Auth0
  const [myUser, setMyUser] = useState(null); // define the user local state
  useEffect(() => {
    setMyUser(user); // set a new user state
  }, [user]); // re-render when the user state from Auth0 changes
  return (
    <UserContext.Provider
      value={{ loginWithRedirect, logout, myUser }}
      // returning states and function props to be used in components
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
