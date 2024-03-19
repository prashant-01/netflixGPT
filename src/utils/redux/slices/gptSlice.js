import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name : "gpt" ,
    initialState : {
        gptLoading : localStorage.getItem('gptLoading') ? JSON.parse(localStorage.getItem('gptLoading')) : false ,
        showGPT : localStorage.getItem('showGPT') ? JSON.parse(localStorage.getItem('showGPT')) : false ,
        gptSuggestions : localStorage.getItem('gptSuggestions') ? JSON.parse(localStorage.getItem('gptSuggestions')) : [] ,
    } ,
    reducers : {
        setGptLoading : ( state , action ) => {
            state.gptLoading = action.payload;
            localStorage.setItem('gptLoading' , JSON.stringify(state.gptLoading));
        } ,
        setShowGPT : ( state , action ) => {
            state.showGPT = action.payload;
            localStorage.setItem('showGPT' , JSON.stringify(state.showGPT));
        } ,
        setGptSuggestions : ( state , action ) => {
            state.gptSuggestions = action.payload;
            localStorage.setItem('gptSuggestions' , JSON.stringify(state.gptSuggestions));
        }
    }
})

export const { setShowGPT , setGptSuggestions , setGptLoading } = gptSlice.actions;
export default gptSlice.reducer;