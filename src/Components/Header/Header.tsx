import React, { useContext, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ThemeToggleButton from "../ThemeToggleButton";
import { ThemeContext } from "../ContextApi/ThemeContext";

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  return (
    <div
      className={`header ${navActive ? "active" : ""} ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="nav">
        <Link to="/">
          <div
            className={`text-center p-2 m-2 text-2xl font-extrabold ${
              darkMode ? "text-black" : "text-white"
            } shadow-lg ${darkMode ? "bg-slate-200" : "bg-black"}`}
          >
            YTS
          </div>
        </Link>

        <div className="xl:hidden" onClick={toggleNav}>
          <div className={`nav-toggle ${navActive ? "active" : ""}`}>☰</div>
        </div>
        <div className={`nav-links ${navActive ? "active" : ""}`}>
          <ul>
            <div>
              <li>
                <Link
                  className={`nav-links ${
                    darkMode ? "text-blue-300" : "text-white"
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  className={`nav-links ${
                    darkMode ? "text-blue-300" : "text-white"
                  }`}
                  to="/"
                >
                  3D
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  className={`nav-links ${
                    darkMode ? "text-blue-300" : "text-white"
                  }`}
                  to="/"
                >
                  4K
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  className={`nav-links ${
                    darkMode ? "text-blue-300" : "text-white"
                  }`}
                  to="/userdata"
                >
                  UserData
                </Link>
              </li>
            </div>
            <div>
              <li>
                <a
                  className={`nav-links ${
                    darkMode ? "text-blue-300" : "text-white"
                  }`}
                  href="/"
                >
                  Browse Movies
                </a>
              </li>
            </div>
            <li>
              <ThemeToggleButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
