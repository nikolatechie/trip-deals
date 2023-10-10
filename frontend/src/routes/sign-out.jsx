import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function SignOut() {
  const [isSignedOut, setIsSignedOut] = useState(false);

  useEffect(() => {
    const signOut = async () => {
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      try {
        const response = await fetch("http://localhost:80/api/sign_out.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          // Sign out successful
          setIsSignedOut(true);
        } else {
          console.log(data.errorMessage);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    signOut();
  }, []);

  return isSignedOut ? <Navigate to='/' /> : null;
}
