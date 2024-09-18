import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    Posts: []
}

const FetchApi = createSlice({
    name: 'setData',
    initialState,
    reducers:{
        saveData : (state, action:PayloadAction<Posts>)=>{
            state.Posts = action.payload;
        }
    }
})

export const {saveData} = FetchApi.actions;

export default FetchApi.reducer