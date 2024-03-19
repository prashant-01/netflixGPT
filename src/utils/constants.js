export const USER_LOGO = 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=';
export const NOW_PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
export const POPULAR_URL = "https://api.themoviedb.org/3/movie/popular";
export const TOP_RATED_URL = "https://api.themoviedb.org/3/movie/top_rated";
export const UPCOMING_URL = "https://api.themoviedb.org/3/movie/upcoming";
export const VIDEO_URL = 'https://api.themoviedb.org/3/movie';
export const SEARCH_MOVIE_URL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=';
export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ process.env.REACT_APP_TMDB_KEY }`
    }
};

export const IMG_CDN = "https://image.tmdb.org/t/p/w200";

export const SUPPORTED_LANGUAGE = [
    {
        identifier : "en" ,
        name : "English"
    } ,
    {
        identifier : "hindi" ,
        name : "हिंदी"
    }
];