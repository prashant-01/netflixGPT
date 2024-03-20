import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name : "movies" ,
    initialState : {
        movies : localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : [] ,
        popularMovies : localStorage.getItem('popularMovies') ? JSON.parse(localStorage.getItem('popularMovies')) : [] ,
        upcomingMovies : localStorage.getItem('upcomingMovies') ? JSON.parse(localStorage.getItem('upcomingMovies')) : [] ,
        topRatedMovies : localStorage.getItem('topRatedMovies') ? JSON.parse(localStorage.getItem('topRatedMovies')) : [] ,
        trailerKey : localStorage.getItem('trailerKey') ? JSON.parse(localStorage.getItem('trailerKey')) : null ,
        
    } ,
    reducers : {
        setMovies : ( state , action ) => {
            state.movies = action.payload ;
            localStorage.setItem('movies' , JSON.stringify(state.movies))
        } ,
        setPopularMovies : ( state , action ) => {
            state.popularMovies = action.payload ;
            localStorage.setItem('popularMovies' , JSON.stringify(state.movies))
        } ,
        setTopRatedMovies : ( state , action ) => {
            state.topRatedMovies = action.payload ;
            localStorage.setItem('topRatedMovies' , JSON.stringify(state.movies))
        } ,
        setUpcomingMovies : ( state , action ) => {
            state.upcomingMovies = action.payload ;
            localStorage.setItem('upcomingMovies' , JSON.stringify(state.movies))
        } ,
        addMovieTrailer : ( state , action ) => {
            state.trailerKey = action.payload;
            localStorage.setItem("trailerKey" , JSON.stringify(state.trailerKey));
        }
    }
})

export const { 
    setMovies , 
    setPopularMovies ,
    setTopRatedMovies ,
    setUpcomingMovies ,
    addMovieTrailer } = moviesSlice.actions;
export default moviesSlice.reducer;