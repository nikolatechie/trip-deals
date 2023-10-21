import React, { useEffect, useState } from "react";
import { USER_ROLE, PATH } from "../data/constants.js";
import { getUserRole } from "../helpers/auth.js";
import styles from "../styles/navbar.module.css";

export default function NavBar() {
  const [userRole, setUserRole] = useState(USER_ROLE.UNAUTHENTICATED);

  useEffect(() => {
    setUserRole(getUserRole());
  }, []);

  return (
    <header>
      <nav>
        <div className={styles.navbarContent}>
          <div>
            <h2>
              <a href={PATH.HOME_PAGE}>TripDeals</a>
            </h2>
          </div>
          <div>
            <ul>
              {userRole === USER_ROLE.ADMIN && (
                <>
                  <li>
                    <a href={PATH.NEW_DEAL_PAGE}>New deal</a>
                  </li>
                  <li>
                    <a href={PATH.NEW_ARTICLE_PAGE}>New article</a>
                  </li>
                </>
              )}
              {userRole !== USER_ROLE.UNAUTHENTICATED && (
                <li>
                  <a href={PATH.BOOKINGS_PAGE}>Bookings</a>
                </li>
              )}
              <li>
                <a href={PATH.HOME_PAGE}>Home</a>
              </li>
              <li>
                <a href={PATH.SEARCH_DEALS_PAGE}>Deals</a>
              </li>
              <li>
                <a href={PATH.NEWS_PAGE}>News</a>
              </li>
              <li>
                <a href={PATH.CONTACT_PAGE}>Contact</a>
              </li>
              {userRole === USER_ROLE.UNAUTHENTICATED ? (
                <>
                  <li>
                    <a href={PATH.REGISTRATION_PAGE}>Register</a>
                  </li>
                  <li>
                    <a href={PATH.SIGN_IN_PAGE}>Sign in</a>
                  </li>
                </>
              ) : (
                <li>
                  <a href={PATH.SIGN_OUT_PAGE}>Sign out</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
