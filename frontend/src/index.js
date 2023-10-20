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
import { USER_ROLE, PATH } from "./data/constants.js";
import { UnauthorisedPage } from "./routes/UnauthorisedPage";
import NewsPage from "./routes/NewsPage";
import EditArticlePage from "./routes/EditArticlePage";
import NewArticlePage from "./routes/NewArticlePage";
import BookDealPage from "./routes/BookDealPage";
import BookingsPage from "./routes/BookingsPage";
import RegistrationPage from "./routes/RegistrationPage";
import "./styles/global.css";

const router = createBrowserRouter([
  {
    path: PATH.HOME_PAGE,
    element: <HomePage />,
  },
  {
    path: PATH.REGISTRATION_PAGE,
    element: <RegistrationPage />,
  },
  {
    path: PATH.SIGN_IN_PAGE,
    element: <SignInPage />,
  },
  {
    path: PATH.SIGN_OUT_PAGE,
    element: <SignOut />,
  },
  {
    path: PATH.NEW_DEAL_PAGE,
    element: (
      <ProtectedRoute roles={[USER_ROLE.ADMIN]}>
        <NewDealPage />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.SEARCH_DEALS_PAGE,
    element: <DealsPage />,
  },
  {
    path: PATH.SHOW_DEALS_PAGE,
    element: <ShowDealsPage />,
  },
  {
    path: PATH.BOOK_DEAL_PAGE,
    element: (
      <ProtectedRoute roles={[USER_ROLE.ADMIN, USER_ROLE.CUSTOMER]}>
        <BookDealPage />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.BOOKINGS_PAGE,
    element: (
      <ProtectedRoute roles={[USER_ROLE.ADMIN, USER_ROLE.CUSTOMER]}>
        <BookingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.NEWS_PAGE,
    element: <NewsPage />,
  },
  {
    path: PATH.NEW_ARTICLE_PAGE,
    element: (
      <ProtectedRoute roles={[USER_ROLE.ADMIN]}>
        <NewArticlePage />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.EDIT_ARTICLE_PAGE,
    element: (
      <ProtectedRoute roles={[USER_ROLE.ADMIN]}>
        <EditArticlePage />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.EDIT_DEAL_PAGE,
    element: (
      <ProtectedRoute roles={[USER_ROLE.ADMIN]}>
        <EditDealPage />
      </ProtectedRoute>
    ),
  },
  {
    path: PATH.CONTACT_PAGE,
    element: <ContactPage />,
  },
  {
    path: PATH.UNAUTHORISED_PAGE,
    element: <UnauthorisedPage />,
  },
  {
    path: PATH.ERROR_PAGE,
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
