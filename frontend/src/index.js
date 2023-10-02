import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>naslovna</h1>,
  },
  {
    path: "/login",
    element: <h1>login</h1>,
  },
  {
    path: "*",
    element: <h1>ostalo</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);