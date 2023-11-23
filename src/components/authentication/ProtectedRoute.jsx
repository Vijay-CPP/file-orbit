import React from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  if (!user) {
    console.log("User not authenticated, redirecting to /login");
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default ProtectedRoute;
