import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from "./slices/auth.ts";

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export type AppDispatch = typeof store.dispatch

export default store