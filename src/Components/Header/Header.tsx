import React from "react";
import "./style.css";
import { useTheme } from "../ContextApi/ThemeContext";
import ThemeToggleButton from "../ThemeToggleButton";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div className="header">
      <div className="nav">
        <div>
          <h1>Yts</h1>
        </div>
        <div className="button">
          <ThemeToggleButton />
        </div>
        <div></div>
        <div className="nav-links">
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
              <a href="/">Trending</a>
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
