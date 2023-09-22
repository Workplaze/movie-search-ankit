import React, { createContext, useReducer, useState } from "react";

// Define the ThemeContext once
const ThemeContext = createContext<{
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  state: any;
  dispatch: React.Dispatch<any>;
}>({
  darkMode: false,
  setDarkMode: () => {},
  state: {},
  dispatch: () => {},
});

export const SET_USER_ROLE_FILTER = "SET_USER_ROLE_FILTER";

export const userReducer = (
  state: any,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case SET_USER_ROLE_FILTER:
      return { ...state, userRoleFilter: action.payload };
    default:
      return state;
  }
};

const ThemeContextProvider = (props: any) => {
  const [darkMode, setDarkMode] = useState(false);
  const [state, dispatch] = useReducer(userReducer, {
    userRoleFilter: "",
  });

  return (
    <div>
      <ThemeContext.Provider value={{ darkMode, setDarkMode, state, dispatch }}>
        {props.children}
      </ThemeContext.Provider>
    </div>
  );
};

export { ThemeContext, ThemeContextProvider };
