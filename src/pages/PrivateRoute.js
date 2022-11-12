import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth0(); // destructuring all the state and functionality from Auth0
  if (!user) {
    return <Navigate to="/" />;
  } // if they exist no user details go back to the home page
  return children; // display all the page in the web page when the user details exist
};
export default PrivateRoute;
