import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  return (
    <div className={`header ${navActive ? "active" : ""}`}>
      <div className="nav">
        <div className="text-center p-2 m-2 text-2xl font-extrabold shadow-lg shadow-yellow-200">
          <Link to="/">YTS</Link>
        </div>
        <div className="xl:hidden" onClick={toggleNav}>
          <div className={`nav-toggle ${navActive ? "active" : ""}`}>☰</div>
        </div>
        <div className={`nav-links ${navActive ? "active" : ""}`}>
          <ul>
            <div>
              <li>
                <Link className="nav-links" to="/">
                  Home
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link className="nav-links" to="/">
                  3D
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link className="nav-links" to="/">
                  4K
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link to="/userdata">UserData</Link>
              </li>
            </div>
            <div>
              <li>
                <a href="/">Browse Movies</a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
