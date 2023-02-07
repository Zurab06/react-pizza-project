import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


type FetchPizzaArgs = Record<string, string>
export type SearchPizzaParams = {
    sortBy: string,
    order: string,
    category:string,
    search:string,
    pageCount:string
}
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchByIdStatus',
    async (params: FetchPizzaArgs) => {
        const { sortBy,
            order,
            category,
            search,
            pageCount } = params
        const { data } = await axios.get<Pizza[]>(`https://6375f41b7e93bcb006be573c.mockapi.io/pizzas?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    })


type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;

}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    pizzas: Pizza[]
    status: Status
}

const initialState: PizzaSliceState = {
    status: Status.LOADING,
    pizzas: [],
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.pizzas = action.payload
        }
    },


    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.pizzas = action.payload
                state.status = Status.SUCCESS
            })
            .addCase(fetchPizzas.pending, (state, action) => {
                state.status = Status.LOADING
                state.pizzas = []
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = Status.ERROR
                state.pizzas = []
            })

    }

})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer