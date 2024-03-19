import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import Header from '../Header';

const GptSearch = () => {
    return (
        <div
        className='bg-gradient-to-b from-black to-red-600 min-h-screen'>
            <Header />
            <GptSearchBar />
            <GptMovieSuggestion />
        </div>
    )
}

export default GptSearch