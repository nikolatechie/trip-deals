import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./routes/landing-page";
import SignInPage from "./routes/sign-in-page";
import { ErrorPage } from "./routes/error-page";
import NewDealPage from "./routes/new-deal-page";
import SignOut from "./routes/sign-out";
import { ProtectedRoute } from "./routes/protected-route";
import ContactPage from "./routes/contact-page";
import ShowDealsPage from "./routes/show-deals-page";
import EditDealPage from "./routes/edit-deal-page";
import { USER_ROLE } from "./auth/auth";
import { UnauthorisedPage } from "./routes/unauthorised-page";

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
      <ProtectedRoute roles={[USER_ROLE.ADMIN]}>
        <NewDealPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/show-deals",
    element: <ShowDealsPage />,
  },
  {
    path: "/edit-deal",
    element: (
      <ProtectedRoute roles={[USER_ROLE.ADMIN]}>
        <EditDealPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/unauthorised",
    element: <UnauthorisedPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
