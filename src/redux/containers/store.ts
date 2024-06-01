import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productSlice from "../slices/product.slice";
import subImageSlice from "../slices/subImage.slice";
import orderDetailSlice from "../slices/orderDetail.slice";
import orderItemSlice from "../slices/orderItem.slice";
import paymentSlice from "../slices/payment.slice";


export const store = configureStore({
  reducer: {
    product: productSlice,
    subImage: subImageSlice,
    orderDetail: orderDetailSlice,
    orderItem: orderItemSlice,
    payment: paymentSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()