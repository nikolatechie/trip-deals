import React, { useEffect, useState } from "react";
import { USER_ROLE, getUserRole } from "../auth/auth.js";
import styles from "../styles/navbar-style.module.css";

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
                <li>
                  <a href='/new-deal'>New deal</a>
                </li>
              )}
              <li>
                <a href='/'>Browse deals</a>
              </li>
              <li>
                <a href='/contact'>Contact</a>
              </li>
              <li>
                {userRole === USER_ROLE.UNAUTHENTICATED ? (
                  <a href='/sign-in'>Sign in</a>
                ) : (
                  <a href='/sign-out'>Sign out</a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
