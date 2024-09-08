// PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserDetailsContext } from "../App";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element }) => {
  const { userDetails } = useContext(UserDetailsContext);
  console.log(9,userDetails)
  // Replace this with your actual authentication logic
  const isAuthenticated = userDetails !== null;

  return isAuthenticated ? (
    React.cloneElement(element, { userDetails })
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
