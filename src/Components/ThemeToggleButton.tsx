import React, { useContext } from "react";
import { ThemeContext } from "./ContextApi/ThemeContext";

import { Button } from "react-bootstrap";
import darkModeImage from "./Asset/dark.png";
import light from "./Asset/light.png";

const ThemeToggleButton = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div className="shadow-lg shadow-slate-50 rounded-full">
      <label>
        {darkMode ? (
          <div>
            <Button className="text-white" onClick={toggleDarkMode}>
              <img
                src={light}
                alt="Light Mode"
                width="24"
                height="24"
                className="bg-white rounded-full"
              />
            </Button>
          </div>
        ) : (
          <div>
            <Button className="text-white" onClick={toggleDarkMode}>
              <img
                src={darkModeImage}
                alt="Dark Mode"
                width="26"
                height="26"
                className="bg-white rounded-full"
              />
            </Button>
          </div>
        )}
      </label>
    </div>
  );
};

export default ThemeToggleButton;
