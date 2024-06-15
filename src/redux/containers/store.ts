import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import productSlice from '../slices/product.slice'
import subImageSlice from '../slices/subImage.slice'
import orderDetailSlice from '../slices/orderDetail.slice'
import orderItemSlice from '../slices/orderItem.slice'
import paymentSlice from '../slices/payment.slice'
import materialSlice from '../slices/material.slice'
import accessorySlice from '../slices/accessory.slice'
import cartItemSlice from '../slices/cartItem.slice'
import colorSlice from '../slices/color.slice'
import sizeSlice from '../slices/size.slice'

export const store = configureStore({
  reducer: {
    product: productSlice,
    subImage: subImageSlice,
    orderDetail: orderDetailSlice,
    orderItem: orderItemSlice,
    payment: paymentSlice,
    material: materialSlice,
    accessory: accessorySlice,
    cartItem: cartItemSlice,
    color: colorSlice,
    size: sizeSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
