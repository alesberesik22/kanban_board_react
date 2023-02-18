import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    fullscreen:true,
    refetch:false,
    board:"",
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
        },
        setBoard:(state,action) => {
            state.board = action.payload
        }
    }
})

export const {setFullscreen,setRefetch,setBoard} = reduxStoreSlice.actions;

export default reduxStoreSlice.reducer;