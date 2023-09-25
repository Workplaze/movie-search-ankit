import { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  Title: string;
  Poster: string;
}

const useMovieSearch = (
  defaultQuery: string = "star wars",
  apiKey: string = "263d22d8"
) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = `https://www.omdbapi.com/?s=${defaultQuery}&apikey=${apiKey}`;
        const response = await axios.get(url);
        setMovies(response.data.Search);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [defaultQuery, apiKey]);

  return { movies, loading };
};

export default useMovieSearch;
