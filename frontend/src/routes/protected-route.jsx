import React from "react";
import { Navigate } from "react-router-dom";
import { isUserSignedIn } from "../auth/auth.js";

export const ProtectedRoute = ({ children }) => {
  return isUserSignedIn() ? children : <Navigate to='/sign-in' replace />;
};
