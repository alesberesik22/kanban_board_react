import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    fullscreen:true,
    refetch:false
}

export const reduxStoreSlice = createSlice({
    name:'reduxStoreSlice',
    initialState:initialState,
    reducers:{
        setFullscreen: (state, action) => {
            state.fullscreen = action.payload
        },
        setRefetch: (state, action) => {
            state.refetch = action.payload
        }
    }
})

export const {setFullscreen,setRefetch} = reduxStoreSlice.actions;

export default reduxStoreSlice.reducer;