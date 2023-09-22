import React from "react";
import "./style.css";

type Movie = {
  Title: string;
  Poster: string;
};

type MovieListProps = {
  movies: Movie[];
};

const MoviesList: React.FC<MovieListProps> = (movies) => {
  return (
    <div className="movies">
      {movies.movies.map((movie: any, index: any) => (
        <div key={index} className="movieList">
          <img src={movie.Poster} alt="movie" />
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
