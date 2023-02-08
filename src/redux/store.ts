import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlices';
import cart from './slices/cartSlice'
import pizza from './slices/PizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer:{
    filter,
    cart,
    pizza

  },

})

type FuncType = typeof store.getState

export type RootState = ReturnType<FuncType>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
