import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUpcomingMovies } from '../utils/redux/slices/moviesSlice'
import { API_OPTIONS, UPCOMING_URL } from "../utils/constants";
const useMovies = () => {
    const dispatch = useDispatch();
    const { upcomingMovies } = useSelector( store => store.movies );
    const fetchUpcomingMovies = async () => {
        try{
            const data = await fetch( UPCOMING_URL , API_OPTIONS );
            const json = await data.json();
            // console.log(json)
            if(json) dispatch(setUpcomingMovies(json.results));
        }catch(error){
            console.log(error);
        }
    }

    useEffect( () => {
        upcomingMovies !== 0 && fetchUpcomingMovies();
    } , []);
}
    export default useMovies;