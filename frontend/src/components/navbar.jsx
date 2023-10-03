import React from "react";
import "../styles/navbar-style.css";

export const NavBar = () => {
  return (
    <header>
      <nav>
        <div className='navbar-content'>
          <div>
            <h2>
              <a href='/'>TripDeals</a>
            </h2>
          </div>
          <div>
            <ul>
              <li>
                <a className='link-margin' href='/'>
                  Browse deals
                </a>
              </li>
              <li>
                <a href='/sign-in'>Sign in</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
