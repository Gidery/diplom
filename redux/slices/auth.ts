import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "../../axios";

export interface LoginRbo {
    email: string,
    password: string
}

export interface RegisterRbo {
    email: string,
    password: string,
    name: string,
    surname: string,
    passportData: {
        series: string,
        number: string,
    },
    actualAddress?: string
}

export const loginQuery = createAsyncThunk('/auth/login', async (rbo: LoginRbo) => {
    const {data} = await axios.post('/auth/login', rbo)
    return data
})

export const registerQuery = createAsyncThunk('/auth/register', async (rbo: RegisterRbo) => {
    const {data} = await axios.post('/auth/register', rbo)
    return data
})

const initialState = {
    data: null,
    status: 'loading',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginQuery.pending, (state) => {
            state.data = null
            state.status = 'loading'
        }).addCase(loginQuery.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'success'
        }).addCase(loginQuery.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })

        builder.addCase(registerQuery.pending, (state) => {
            state.data = null
            state.status = 'loading'
        }).addCase(registerQuery.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'success'
        }).addCase(registerQuery.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })
    }
})

export const authReducer = authSlice.reducer