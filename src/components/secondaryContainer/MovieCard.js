import React from 'react'
import { IMG_CDN } from '../../utils/constants'

const MovieCard = ({ movie }) => {
  const { poster_path } = movie;
  return (
    <div className='w-48'>
      <img src={ IMG_CDN + poster_path } alt='movieCard' className='object-cover rounded-md'/>
    </div>
  )
}

export default MovieCard