import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type } from "os";
import { Interface } from "readline";
import { RootState } from "../store";

export type CartItem ={
    id:string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    asize: number;
    count: number
}
interface CartSliceState {
    totalPrice: number;
    items: CartItem[]
}


const initialState: CartSliceState = {
    items: [],
    totalPrice: 0,

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
    
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
                
            }
            else {
                state.items.push({ ...action.payload, count: 1 })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
        minusItem(state,action:PayloadAction<string>){
        const findItem = state.items.find((obj)=>obj.id === action.payload)
        if (findItem) {
            findItem.count--
        }
        },

        removeItem(state, action:PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
           
        },
        clearItems(state) {
            state.items = []
            state.totalPrice =0
        }




    }
})
export const selectCart = (state:RootState)=> state.cart 
export const { addItem, removeItem, clearItems, minusItem} = cartSlice.actions
export default cartSlice.reducer