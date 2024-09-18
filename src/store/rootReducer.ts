import { combineReducers } from "@reduxjs/toolkit";
import FetchApi from "./FetchApi";

const rootReducer = combineReducers({
    FetchApiReducer : FetchApi
})

export default rootReducer;