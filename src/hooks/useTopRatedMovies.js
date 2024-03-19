import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTopRatedMovies } from '../utils/redux/slices/moviesSlice'
import { API_OPTIONS, TOP_RATED_URL } from "../utils/constants";
const useMovies = () => {
    const dispatch = useDispatch();
    const { topRatedMovies } = useSelector( store => store.movies );
    const fetchNowPlayingMovies = async () => {
        try{
            const data = await fetch( TOP_RATED_URL , API_OPTIONS );
            const json = await data.json();
            // console.log(json)
            if(json) dispatch(setTopRatedMovies(json.results));
        }catch(error){
            console.log(error);
        }
    }

    useEffect( () => {
        !topRatedMovies && fetchNowPlayingMovies();
    } , []);
}
    export default useMovies;