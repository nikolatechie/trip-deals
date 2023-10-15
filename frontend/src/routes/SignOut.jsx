import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { signOut } from "../services/authService.js";

export default function SignOut() {
  const [isSignedOut, setIsSignedOut] = useState(false);

  useEffect(() => {
    const handleSignOut = async () => {
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      const response = await signOut();
      if (response.errorMessage) {
        alert(response.errorMessage);
      } else {
        setIsSignedOut(true);
      }
    };
    handleSignOut();
  }, []);

  return isSignedOut ? <Navigate to='/' /> : null;
}
