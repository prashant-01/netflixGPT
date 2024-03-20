import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import lang from '../../utils/language'
import { useDispatch, useSelector } from 'react-redux';
import openai from '../../utils/openAI'
import { API_OPTIONS, SEARCH_MOVIE_URL } from '../../utils/constants';
import { setGptLoading, setGptSuggestions } from '../../utils/redux/slices/gptSlice'
const GptSearchBar = () => {
    const dispatch = useDispatch();
    const { language } = useSelector( store => store.appConfig );
    const [ searchText , setSearchText ] = useState("");

    const searchMoviesTMDB = async ( movie ) => {
        const result = await fetch( SEARCH_MOVIE_URL + movie , API_OPTIONS );
        const json = await result.json();
        return json.results[0];
    }

    const handleGPTSearch = async () => {
        dispatch( setGptLoading(true) );
        const gptQuery = "Act as a movie recommendation system and suggest movies for the given query : " +
        searchText +
        ". And i only need the names of 12 movies , comma separated like the example given ahead . Example result : Gadar , No way up , Bad land , Sholay , Don" ;
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });

        const gptMovies = chatCompletion?.choices?.[0]?.message?.content?.split(",");
        const promiseArray = gptMovies.map( (movie) => searchMoviesTMDB(movie));
        // [ Promise , Promise , Promise , Promise , Promise ]

        const gptResult = await Promise.all(promiseArray);
        // all promises resolved [ {..} , {..} , {..} , {..} , {..} ]
        console.log(gptResult);

        dispatch( setGptSuggestions( gptResult ) );
        dispatch( setGptLoading(false) );
    }
    return (
        <div className='bg-transparent px-6 py-4 rounded-md'>
            <form onSubmit={ (e) => e.preventDefault()} className='flex flex-col gap-3 sm:flex-row items-center justify-center my-12'>
                <div className='relative'>
                    <input 
                        type='text'
                        value={ searchText }
                        onChange={ (e) => setSearchText(e.target.value) }
                        placeholder={ lang[language].gptSearchPlaceholder }
                        className='h-12 w-[350px] sm:w-[600px] text-white border border-white px-4 py-2 rounded-md bg-transparent
                        focus:outline-none placeholder-white caret-white'
                    />
                    <p className='absolute top-2 right-2'><IoIosSearch size={`2rem`} color='white' /></p>
                </div>
                <button onClick={ () => handleGPTSearch() }
                className='bg-[#e50914] rounded-md text-white font-semibold px-6 py-3'>
                    { lang[language].search }
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar