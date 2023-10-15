import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../helpers/auth.js";

export const ProtectedRoute = (props) => {
  return props.roles.includes(getUserRole()) ? (
    props.children
  ) : (
    <Navigate to='/unauthorised' replace />
  );
};