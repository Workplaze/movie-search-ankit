import React from 'react';
import "./style.css"

const MoviesList = (props:any) => {

  console.log(props,"asdsafasfas")
    
  return (
    <div className='movies'>
        {props.movies.map((movie:any,index:any)=> (
            <div key={index} className='movieList'>
                <img src={movie.Poster} alt='movie'/>
            </div>
        ))}
    </div>
  )
}

export default MoviesList;