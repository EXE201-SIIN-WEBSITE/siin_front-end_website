import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { addCartItem, cartItem } from '~/types/cartItem.type'

import { ResponseData } from '~/types/respone.type'
import { http } from '~/utils/http'

export const createCartItem = createAsyncThunk(
  'cartItem/createCartItem',
  async (data: { id: number; cartItem: addCartItem }, thunkAPI) => {
    const { id, cartItem } = data
    try {
      const response = await http.post<ResponseData<cartItem>>(`/cart-item?productId=${id}`, cartItem)
      console.log('DATA RESPONE: ', response)

      return response.data.data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const createCartItem2 = createAsyncThunk('cartItem/createCartItem2', async (data: addCartItem, thunkAPI) => {
  try {
    const response = await http.post<ResponseData<cartItem>>(`/cart-item`, data)
    console.log('DATA RESPONE: ', response)

    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error.message)
  }
})

export const clearCart = createAction('cartItem/clearCart')
export const removeItemFromCart = createAction<number>('cartItem/removeItemFromCart')
