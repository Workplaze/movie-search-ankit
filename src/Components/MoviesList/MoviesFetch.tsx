import React, { useState } from "react";
import MoviesList from "./MoviesList";
import MovieSearchInput from "./MovieSearchInput";
import useMovieSearch from "./useMovieSearch";

const MoviesFetch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { movies, loading } = useMovieSearch(searchQuery || "star wars", "263d22d8");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <h1>Movies List</h1>
      <div className="movieSearch">
      <MovieSearchInput onSearch={handleSearch} />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <MoviesList movies={movies} />
      )}
    </div>
  );
};

export default MoviesFetch;