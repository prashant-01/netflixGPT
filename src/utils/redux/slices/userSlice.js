import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user" ,
    initialState : {
        user : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null ,
    },
    reducers : {
        addUser : (state , action) => {
            state.user = action.payload;
            localStorage.setItem('user' , JSON.stringify(action.payload));
        } ,
        removeUser : (state) => {
            state.user = null ;
            localStorage.removeItem('user');
        }
    }
})

export const { addUser , removeUser } = userSlice.actions;
export default userSlice.reducer;