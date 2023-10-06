import React, { useEffect, useState } from "react";
import { isUserSignedIn } from "../auth/auth.js";
import styles from "../styles/navbar-style.module.css";

export default function NavBar() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(isUserSignedIn());
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
                <a href='/'>Browse deals</a>
              </li>
              {!isSignedIn ? (
                <li>
                  <a href='/sign-in'>Sign in</a>
                </li>
              ) : (
                <>
                  <li>
                    <a href='/new-deal'>New Deal</a>
                  </li>
                  <li>
                    <a href='/sign-out'>Sign out</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
