import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IMG_CDN } from '../../utils/constants';
import Shimmer from '../Shimmer';

const GptMovieSuggestion = () => {
  const { gptLoading , gptSuggestions } = useSelector( store => store.gpt );
  const [ suggestedMovies , setSuggestedMovies ] = useState([]);
  useEffect( () => {
    setSuggestedMovies(gptSuggestions ? gptSuggestions.filter(g => g !== null) : gptSuggestions)
  }  , [gptSuggestions])
  return (
    <div className='pb-4'>
      {
        gptLoading ? 
        <div className='flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2'>
          {
            [...Array(12)].map( (_ , i) => <Shimmer key={i}/> )
          }
        </div>
        : 
        suggestedMovies && suggestedMovies.length > 0 &&
        <div className='flex flex-col sm:flex-row flex-wrap items-center sm:isolation-auto justify-center gap-4 sm:gap-2'>
          {
            suggestedMovies.map( movie => {
              if(movie !== null){
                return(
                  <div>
                    {
                      movie?.poster_path ? 
                      <img src={ IMG_CDN + movie.poster_path } alt='poster-unavailable'
                      className='rounded-md object-cover h-[450px] sm:h-[300px] w-[300px] sm:w-[200px]'/> :
                      <div className='w-[200px] text-wrap text-white text-lg'>
                        <img src={ IMG_CDN + movie.poster_path } alt='poster-unavailable'
                        className='rounded-md object-cover '/>
                        { movie.title }
                      </div>
                    }
                  </div>
                )
              }
            })
          }
        </div>
      }
    </div>
  )
}

export default GptMovieSuggestion