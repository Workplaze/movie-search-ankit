import React from "react";
import Introduction from "./Introduction";
import MoviesFetch from "./MoviesList/MoviesFetch";

const HomePage = () => {
  return (
    <div>
      <Introduction />
      <MoviesFetch />
    </div>
  );
};

export default HomePage;
