import { createAsyncThunk } from '@reduxjs/toolkit'
import { OrderDetail } from '~/types/orderDetail.type'
import { ResponseData } from '~/types/respone.type'
import { http } from '~/utils/http'

export const createOrderDetail = createAsyncThunk(
  'orderDetail/createOrderDetail',
  async (data: OrderDetail, thunkAPI) => {
    try {
      const response = await http.post<ResponseData<OrderDetail>>(`/order-detail`, data)
      return response.data.data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }
      return thunkAPI.rejectWithValue(error.response?.data || error)
    }
  }
)
