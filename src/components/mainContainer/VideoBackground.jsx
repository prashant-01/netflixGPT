import React from 'react'
import useMovieTrailer from '../../hooks/useMovieTrailer';
import { useSelector } from 'react-redux';
const VideoBackground = ({ movieId }) => {
    const { trailerKey } = useSelector(store => store.movies);
    // customHook
    useMovieTrailer(movieId);
    return (
        <div className='w-full'>
            {
                trailerKey && 
                <div className='w-[100%]'>
                    <iframe 
                        className='w-full aspect-video'
                        src={`https://www.youtube.com/embed/${trailerKey}?loop=1&playlist=${trailerKey}&controls=0&autoplay=1&mute=1`} 
                        allow="autoplay"
                    >
                    </iframe>
                </div>
            }
        </div>
    )
}

export default VideoBackground