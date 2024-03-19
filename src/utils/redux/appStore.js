import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import moviesReducer from './slices/moviesSlice';
import gptReducer from './slices/gptSlice';
import appConfigReducer from './slices/appConfigSlice';
const store = configureStore({
    reducer : {
        user : userReducer ,
        movies : moviesReducer ,
        gpt : gptReducer ,
        appConfig : appConfigReducer ,
    }
})

export default store;