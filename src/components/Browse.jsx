import React from 'react';
import useMovies from '../hooks/useMovies'
import usePopularMovies from '../hooks/usePopularMovies'
import useTopRatedMovies from '../hooks/useTopRatedMovies'
import useUpcomingMovies from '../hooks/useUpcomingMovies'
import MainContainer from './mainContainer/MainContainer';
import SecondaryContainer from './secondaryContainer/SecondaryContainer'
import GptSearch from './gpt/GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  const { showGPT } = useSelector(store => store.gpt)
  useMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      {/* 
        // * Browse Page Structure 
        // ! - Hero Container
        // ?    - Header
        // ?    - Video Background
        // ?    - Video Title
        // ! - Secondary Container
        // ?    - Movies List * n (n rows)
        // ?    - cards * n
      */}
      {
        showGPT ? 
        <GptSearch /> :
        <div>
          <MainContainer />
          <SecondaryContainer />
        </div>
      }
    </div>
  )
}

export default Browse