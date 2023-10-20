import React, { useEffect, useState } from "react";
import { USER_ROLE } from "../data/constants.js";
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
              <a href='/'>TripDeals</a>
            </h2>
          </div>
          <div>
            <ul>
              {userRole === USER_ROLE.ADMIN && (
                <>
                  <li>
                    <a href='/new-deal'>New deal</a>
                  </li>
                  <li>
                    <a href='/new-article'>New article</a>
                  </li>
                </>
              )}
              {userRole !== USER_ROLE.UNAUTHENTICATED && (
                <li>
                  <a href='/bookings'>Bookings</a>
                </li>
              )}
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='/search-deals'>Deals</a>
              </li>
              <li>
                <a href='/news'>News</a>
              </li>
              <li>
                <a href='/contact'>Contact</a>
              </li>
              {userRole === USER_ROLE.UNAUTHENTICATED ? (
                <>
                  <li>
                    <a href='/register'>Register</a>
                  </li>
                  <li>
                    <a href='/sign-in'>Sign in</a>
                  </li>
                </>
              ) : (
                <li>
                  <a href='/sign-out'>Sign out</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
