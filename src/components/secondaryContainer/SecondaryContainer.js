import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';
import lang from '../../utils/language';
const SecondaryContainer = () => {
  const { language } = useSelector( store => store.appConfig );
  const { movies } = useSelector(store => store.movies);
  const { popularMovies } = useSelector(store => store.movies);
  const { topRatedMovies } = useSelector(store => store.movies);
  const { upcomingMovies } = useSelector(store => store.movies);
  return (
    <div className='bg-black'>
      <div className='relative z-10 sm:-mt-60 sm:pt-0 pt-24'>
        <MovieList title={ lang[language].nowPlaying } movies={ movies }/>
        <MovieList title={ lang[language].popular } movies={ topRatedMovies }/>
        <MovieList title={ lang[language].topRated } movies={ popularMovies }/>
        <MovieList title={ lang[language].upcoming } movies={ upcomingMovies }/>
      </div>
    </div>
  )
}

export default SecondaryContainer