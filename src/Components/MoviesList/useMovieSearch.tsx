import { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  Title: string;
  Poster: string;
}

function useMovieSearch(defaultQuery: string = "star wars", apiKey: string = "263d22d8") {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = `http://www.omdbapi.com/?s=${defaultQuery}&apikey=${apiKey}`;
        const response = await axios.get(url);
        console.log(response, "response");
        setMovies(response.data.Search);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [defaultQuery, apiKey]);

  return { movies, loading };
}

export default useMovieSearch;