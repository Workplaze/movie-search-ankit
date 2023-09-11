import React from 'react'
import Header from './Components/Header';
import Introduction from './Components/Introduction';
import MoviesFetch from './Components/MoviesList/MoviesFetch';

const App = () => {
  return (
    <div>
      <Header/>
      <Introduction/>
      <MoviesFetch/>
    </div>
  )
}

export default App