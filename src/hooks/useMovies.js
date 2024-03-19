import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setMovies } from '../utils/redux/slices/moviesSlice'
import { API_OPTIONS, NOW_PLAYING_URL } from "../utils/constants";
const useMovies = () => {
    const dispatch = useDispatch();
    const { movies } = useSelector( store => store.movies );
    const fetchNowPlayingMovies = async () => {
        try{
            const data = await fetch( NOW_PLAYING_URL , API_OPTIONS );
            const json = await data.json();
            // console.log(json)
            if(json) dispatch(setMovies(json.results));
        }catch(error){
            console.log(error);
        }
    }

    useEffect( () => {
        !movies && fetchNowPlayingMovies();
    } , []);
}
    export default useMovies;