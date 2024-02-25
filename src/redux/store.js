import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "./slices/repo"
export const store = configureStore({
    reducer: {
        repo: repoReducer,
    }
})