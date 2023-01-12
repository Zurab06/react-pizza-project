import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchByIdStatus',
    async (params) => {
        const {sortBy,
            order,
            category,
            search,
            pageCount} = params
        const { data } = await axios.get(`https://6375f41b7e93bcb006be573c.mockapi.io/pizzas?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    })

const initialState = {
    status: 'load',
    pizzas: [],
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
    setItems(state, action) {
        state.pizzas = action.payload
    }
    },
    extraReducers: {
        [fetchPizzas.fulfilled]: (state, action)=>{
            state.status = 'success'
            state.pizzas=action.payload
        },
        [fetchPizzas.pending]: (state, action)=>{
            state.status = 'loading'
        },
        [fetchPizzas.rejected]: (state, action)=>{
            state.status = 'error'
        }
        
    }

})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer