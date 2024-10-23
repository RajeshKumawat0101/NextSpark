// PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { UserDetailsContext } from "../App";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element }) => {
  // const { userDetails } = useContext(UserDetailsContext);
  // console.log(9,userDetails)
  // Replace this with your actual authentication logic
  const storedUser = JSON.parse(localStorage.getItem("user")) || null;
  const sessionId = localStorage.getItem("sessionId") || null;

  const isAuthenticated = storedUser && sessionId;

  return isAuthenticated ? (
    React.cloneElement(element, { storedUser, sessionId })
  ) : (
    <Navigate to="/"  replace />
  );
};

export default PrivateRoute;
