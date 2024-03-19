import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
  const { movies } = useSelector( store => store.movies );
  const [ mainMovie , setMainMovie ] = useState(null);

  useEffect( () => {
    if(movies){
      const movie = movies[ Math.floor(Math.random() * (movies.length-1)) ]
      setMainMovie(movie);
    }
  } , []);
  return (
    <div >
      {
        mainMovie && 
        <div>
          <VideoTitle title={ mainMovie.original_title } overview={ mainMovie.overview } />
          <VideoBackground movieId={ mainMovie.id }/>
        </div>
      }
    </div>
  )
}

export default MainContainer