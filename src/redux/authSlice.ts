import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Product from '../models/Product'
import User from '../models/User'

interface AuthState {
    jwt: string | null
}

const initialState: AuthState = {
    jwt: null
} 

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signup: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload
        },
        login: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload
        },
        logout: (state) => {
            state.jwt = null
        }
    },
})

export const { signup, login, logout } = authSlice.actions

export default authSlice.reducer