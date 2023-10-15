import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/HomePage";
import DealsPage from "./routes/DealsPage";
import SignInPage from "./routes/SignInPage";
import { ErrorPage } from "./routes/ErrorPage";
import NewDealPage from "./routes/NewDealPage";
import SignOut from "./routes/SignOut";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import ContactPage from "./routes/ContactPage";
import ShowDealsPage from "./routes/ShowDealsPage";
import EditDealPage from "./routes/EditDealPage";
import { USER_ROLE } from "./auth/auth";
import { UnauthorisedPage } from "./routes/UnauthorisedPage";
import NewsPage from "./routes/NewsPage";
import EditArticlePage from "./routes/EditArticlePage";
import NewArticlePage from "./routes/NewArticlePage";
import BookDealPage from "./routes/BookDealPage";
import BookingsPage from "./routes/BookingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
    path: "/search-deals",
    element: <DealsPage />,
  },
  {
    path: "/show-deals",
    element: <ShowDealsPage />,
  },
  {
    path: "/book-deal",
    element: (
      <ProtectedRoute roles={[USER_ROLE.ADMIN, USER_ROLE.CUSTOMER]}>
        <BookDealPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bookings",
    element: (
      <ProtectedRoute roles={[USER_ROLE.ADMIN, USER_ROLE.CUSTOMER]}>
        <BookingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/news",
    element: <NewsPage />,
  },
  {
    path: "/new-article",
    element: (
      <ProtectedRoute roles={[USER_ROLE.ADMIN]}>
        <NewArticlePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-article",
    element: (
      <ProtectedRoute roles={[USER_ROLE.ADMIN]}>
        <EditArticlePage />
      </ProtectedRoute>
    ),
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
