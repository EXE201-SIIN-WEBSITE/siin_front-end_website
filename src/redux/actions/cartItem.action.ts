/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { addCartItem, cartItem } from '~/types/cartItem.type'

import { ResponseData } from '~/types/respone.type'
import { http } from '~/utils/http'

export const createCartItem = createAsyncThunk(
  'cartItem/createCartItem',
  async (data: { id?: number; userId?: number; cartItem: addCartItem }, thunkAPI) => {
    const { id, userId, cartItem } = data

    try {
      let url = '/cart-item'
      if (id) {
        url += `?productId=${id}`
      }
      if (userId) {
        url += `${id ? '&' : '?'}userId=${userId}`
      }

      const response = await http.post<ResponseData<cartItem>>(url, cartItem)
      console.log('DATA RESPONSE: ', response)

      return response.data.data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const clearCart = createAction('cartItem/clearCart')
export const removeItemFromCart = createAction<number>('cartItem/removeItemFromCart')
