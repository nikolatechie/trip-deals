import React, { useEffect, useState } from "react";
import styles from "../styles/navbar-style.module.css";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("username") !== null) {
      setIsLoggedIn(true);
    }
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
              <li>
                <a className={styles.linkMargin} href='/'>
                  Browse deals
                </a>
              </li>
              <li>
                {!isLoggedIn ? (
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
