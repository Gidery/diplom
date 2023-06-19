import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from "./slices/auth.ts";
import {newsReducer} from "./slices/news.ts";
import {votesReducer} from "./slices/votes.ts";

const store = configureStore({
    reducer: {
        auth: authReducer,
        news: newsReducer,
        votes: votesReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;

export default store