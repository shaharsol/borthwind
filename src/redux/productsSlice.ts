import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Product from '../models/Product'

interface ProductsState {
    products: Product[]
}

const initialState: ProductsState = {
    products: []
} 

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload
        },
        add: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload)
        },
        addOnTop: (state, action: PayloadAction<Product>) => {
            state.products = [action.payload, ...state.products]
        },
        update: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(p => p.id === action.payload.id)
            state.products[index] = action.payload
        },
        remove: (state, action: PayloadAction<{ id: number}>) => {
            const index = state.products.findIndex(p => p.id === action.payload.id)
            state.products.splice(index, 1)
        }
    },
})

export const { init, add, update, remove, addOnTop } = productsSlice.actions

export default productsSlice.reducer