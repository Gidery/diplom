import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "../../axios";
import {AuthState, authStorage} from "../hooks/authStorage.ts";

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

const setAuthState = (authState: AuthState) => {
    changeAuthState(authState)
    return authState
}

const {authState, changeAuthState, clearAuthState} = authStorage()
const authSlice = createSlice({
    name: 'auth',
    initialState: authState,
    reducers: {
        resetAuth: () => {
            clearAuthState()
            return authState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginQuery.pending, () =>
            setAuthState({
                token: '',
                user: null,
                status: 'loading'
            })).addCase(loginQuery.fulfilled, (_, action) =>
            setAuthState({
                token: action.payload.token,
                user: action.payload.user,
                status: 'success'
            })).addCase(loginQuery.rejected, () =>
            setAuthState({
                token: '',
                user: null,
                status: 'error'
            }))

        builder.addCase(registerQuery.pending, () =>
            setAuthState({
                token: '',
                user: null,
                status: 'loading'
            })).addCase(registerQuery.fulfilled, (_, action) =>
            setAuthState({
                token: action.payload.token,
                user: action.payload.user,
                status: 'success'
            })).addCase(registerQuery.rejected, () =>
            setAuthState({
                token: '',
                user: null,
                status: 'error'
            }))
    }
})

export const { resetAuth} = authSlice.actions
export const authReducer = authSlice.reducer