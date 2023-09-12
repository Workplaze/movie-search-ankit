import axios from "axios";
import React, { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import MovieSearchInput from "./MovieSearchInput";

interface Movie {
  Title: string;
  Poster: string;
}

const MoviesFetch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getMoviesRequest = async (query: string) => {
    let url: string;
    if (query) {
      url = `http://www.omdbapi.com/?s=${query}&apikey=263d22d8`;
    } else {
      url = `http://www.omdbapi.com/?s=star wars&apikey=263d22d8`; // Default value
    }
    try {
      const response = await axios.get(url);
      console.log(response, "response");
      setMovies(response.data.Search);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMoviesRequest(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  console.log(movies, "movies");
  return (
    <div>
      <h1>Movies List</h1>
      <div className="movieSearch">
        <MovieSearchInput onSearch={handleSearch} />
      </div>
      {movies.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <MoviesList movies={movies} />
      )}
    </div>
  );
};

export default MoviesFetch;
