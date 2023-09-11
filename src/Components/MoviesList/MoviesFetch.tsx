import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MoviesList from './MoviesList';

const MoviesFetch = () => {
    const [movies, setMovies] = useState([]);

    const getMoviesRequest = async () => {
        const url = `http://www.omdbapi.com/?s=star wars&apikey=263d22d8`;

        try{
            const response = await axios.get(url);
            console.log(response,"response");
            setMovies(response.data.Search)
        }catch (error){
            console.log(error)
        }
        
    }

    useEffect(()=> {
        getMoviesRequest();
    },[]);
    if (movies.length === 0) {
        <div>Loading...</div>
    }
    console.log(movies,"movies")
  return (
    <div>
        <h1>Movies List</h1>
        <MoviesList movies={movies} />

    </div>
  )
}

export default MoviesFetch