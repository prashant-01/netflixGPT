import React from 'react'
import MovieCard from './MovieCard';
import '../../index.css'
const MovieList = ({ title , movies }) => {
  return (
    <div className='px-6'>
      <p className='text-4xl font-semibold py-4 text-white'>{title}</p>
      <div >
        <div className='flex gap-6 overflow-x-scroll scroll-smooth '>
          {
            movies.map( movie => (
              <div key={movie.id}>
                <MovieCard movie={ movie }/>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default MovieList