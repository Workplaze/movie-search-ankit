import React, { useState } from "react";
import "./style.css";

const Header = () => {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  return (
    <div className={`header ${navActive ? "active" : ""}`}>
      <div className="nav">
        <div>
          <h1 className="text-center p-2 m-2 text-2xl font-extrabold shadow-lg shadow-yellow-200">Yts</h1>
        </div>
        <div className="xl:hidden" onClick={toggleNav}>
          <div className={`nav-toggle ${navActive ? "active" : ""}`}>☰</div>
        </div>
        <div className={`nav-links ${navActive ? "active" : ""}`}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">3D</a>
            </li>
            <li>
              <a href="/">4K</a>
            </li>
            <li>
              <a href="/userdata">UserData</a>
            </li>
            <li>
              <a href="/">Browse Movies</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
