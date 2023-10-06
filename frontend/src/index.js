import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./routes/landing-page";
import SignInPage from "./routes/sign-in-page";
import { ErrorPage } from "./routes/error-page";
import NewDealPage from "./routes/new-deal-page";
import SignOut from "./routes/sign-out";
import { ProtectedRoute } from "./routes/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-out",
    element: <SignOut />,
  },
  {
    path: "/new-deal",
    element: (
      <ProtectedRoute>
        <NewDealPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
