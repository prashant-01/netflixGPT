import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setPopularMovies } from '../utils/redux/slices/moviesSlice'
import { API_OPTIONS, POPULAR_URL } from "../utils/constants";
const useMovies = () => {
    const dispatch = useDispatch();
    const { popularMovies } = useSelector( store => store.movies );
    const fetchNowPlayingMovies = async () => {
        try{
            const data = await fetch( POPULAR_URL , API_OPTIONS );
            const json = await data.json();
            // console.log(json)
            if(json) dispatch(setPopularMovies(json.results));
        }catch(error){
            console.log(error);
        }
    }

    useEffect( () => {
        !popularMovies && fetchNowPlayingMovies();
    } , []);
}
    export default useMovies;