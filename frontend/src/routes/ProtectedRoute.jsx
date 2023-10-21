import React from "react";
import { Navigate } from "react-router-dom";
import { PATH } from "../data/constants.js";
import { getUserRole } from "../helpers/auth.js";

export const ProtectedRoute = (props) => {
  return props.roles.includes(getUserRole()) ? (
    props.children
  ) : (
    <Navigate to={PATH.UNAUTHORISED_PAGE} replace />
  );
};
