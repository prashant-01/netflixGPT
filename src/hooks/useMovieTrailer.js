import { useEffect } from "react";
import { API_OPTIONS, VIDEO_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../utils/redux/slices/moviesSlice"
// fetching movie trailer key and updating store with trailer key

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const fetchMovieVideos = async () => {
        const data = await fetch( VIDEO_URL + `/${ movieId }/videos` , API_OPTIONS )
        const json = await data.json();
        const filterData = json.results.filter( (video) => video.type === "Trailer" )
        const trailer = filterData.length ? filterData[0] : json.results[0];
        if(trailer)dispatch( addMovieTrailer(trailer.key) );
    }
    useEffect( () => {
        fetchMovieVideos();
    } , [movieId]);
}

export default useMovieTrailer;