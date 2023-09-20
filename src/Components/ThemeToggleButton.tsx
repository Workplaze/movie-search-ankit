import React, { useContext } from "react";
import { ThemeContext } from "./ContextApi/ThemeContext";

import { Button } from "react-bootstrap";

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
              DarkMode
            </Button>
          </div>
        ) : (
          <div>
            <Button className="text-white" onClick={toggleDarkMode}>
              LightMode
            </Button>
          </div>
        )}
      </label>
    </div>
  );
};

export default ThemeToggleButton;
