import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productSlice from "../slices/product.slice";


export const store = configureStore({
  reducer: {
    product: productSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()