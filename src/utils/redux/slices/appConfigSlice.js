import { createSlice } from "@reduxjs/toolkit";

const appConfigSlice = createSlice({
    name : "appConfig" ,
    initialState : {
        language : localStorage.getItem('language') ? JSON.parse(localStorage.getItem('language')) : "en" ,
    } ,
    reducers : {
        setLanguage : (state , action) => {
            state.language = action.payload;
            localStorage.setItem('language' , JSON.stringify(state.language));
        }
    }
})

export const { setLanguage } = appConfigSlice.actions;
export default appConfigSlice.reducer;