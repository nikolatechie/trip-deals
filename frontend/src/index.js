import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./routes/landing-page";
import SearchDealsPage from "./routes/search-deals-page";
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
import NewsPage from "./routes/news-page";
import EditArticlePage from "./routes/edit-article-page";
import NewArticlePage from "./routes/new-article-page";
import BookDealPage from "./routes/book-deal-page";

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
    path: "/search-deals",
    element: <SearchDealsPage />,
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
