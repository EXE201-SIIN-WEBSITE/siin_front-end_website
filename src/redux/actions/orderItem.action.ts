import { createAsyncThunk } from '@reduxjs/toolkit'
import { orderItem } from '~/types/orderItem.type'
import { ResponseData } from '~/types/respone.type'
import { http } from '~/utils/http'

export const createOrderItem = createAsyncThunk('orderItem/createOrderItem', async (data: orderItem, thunkAPI) => {
  try {
    const response = await http.post<ResponseData<orderItem>>(`/order-item`, data)
    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})
