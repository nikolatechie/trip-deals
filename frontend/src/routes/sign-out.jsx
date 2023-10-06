import React from "react";
import { Navigate } from "react-router-dom";

export default function SignOut() {
  localStorage.removeItem("username");
  return <Navigate to='/' />;
}
