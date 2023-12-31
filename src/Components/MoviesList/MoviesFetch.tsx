import React, { useState } from "react";
import MoviesList from "./MoviesList";
import MovieSearchInput from "./MovieSearchInput";
import useMovieSearch from "../Hooks/useMovieSearch";

const MoviesFetch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { movies, loading } = useMovieSearch(
    searchQuery || "star wars",
    "263d22d8"
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <h1 className="text-center underline text-2xl font-extrabold m-10">
        Movies List
      </h1>
      <div className="movieSearch">
        <MovieSearchInput onSearch={handleSearch} />
      </div>
      {loading ? <div>Loading...</div> : <MoviesList movies={movies} />}
    </div>
  );
};

export default MoviesFetch;
