import React, { useContext } from "react";
import Header from "./Components/Header";
import Introduction from "./Components/Introduction";
import MoviesFetch from "./Components/MoviesList/MoviesFetch";
import { ThemeContext } from "./Components/ContextApi/ThemeContext";

const App = () => {
  const theme = useContext(ThemeContext);

  return (
    <div
      style={{ backgroundColor: theme.primary.main, color: theme.primary.text }}
    >
      <Header />
      <Introduction />
      <MoviesFetch />
    </div>
  );
};

export default App;
