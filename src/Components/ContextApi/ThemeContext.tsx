import { createContext, useState } from "react";

const ThemeContext = createContext<{
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  darkMode: false,
  setDarkMode: () => {},
});

const ThemeContextProvider = (props: any) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        {props.children}
      </ThemeContext.Provider>
    </div>
  );
};

export { ThemeContext, ThemeContextProvider };
