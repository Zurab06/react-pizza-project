import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Sort = {
    name: string;
    sortProperty: 'rating' | 'title' | 'price' |  '-rating' | '-title' | '-price' 
}

export interface Filters {
    searchValue: string;
    categoryId: number;
    pageCount: number;
    sort: Sort;
}

interface FilterSliceState extends Filters {}

const initialState:FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    pageCount: 1,
    sort: {
        name: "по популярности",
        sortProperty: 'rating'
    }
}

const filterSlice= createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state,action: PayloadAction<number>){
            state.categoryId = action.payload
        },
        setSearchValue(state,action:PayloadAction<string>){
            state.searchValue=action.payload
        },
        setSort(state,action:PayloadAction<Sort>){
            state.sort = action.payload
        },
        setPageCount(state,action:PayloadAction<number>){
            state.pageCount = action.payload
            
        },
        setFilters(state,action:PayloadAction<Partial<Filters>>){
            if (action.payload.categoryId !== undefined) state.categoryId = action.payload.categoryId
            if (action.payload.pageCount !== undefined) state.pageCount = action.payload.pageCount
            if (action.payload.sort) state.sort = action.payload.sort

            console.log(action.payload)
        }
    }
})
export const searchValue = (state:RootState)=> state.filter.searchValue
export const selectSort = (state:RootState)=> state.filter.sort
export const {setCategoryId,setSort,setPageCount,setFilters,setSearchValue} = filterSlice.actions
export default filterSlice.reducer
