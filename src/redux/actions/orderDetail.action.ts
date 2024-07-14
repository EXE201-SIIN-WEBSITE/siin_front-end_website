/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { OrderDetail } from '~/types/orderDetail.type'
import { ResponseData } from '~/types/respone.type'
import { http } from '~/utils/http'

// export const createOrderDetail = createAsyncThunk(
//   'orderDetail/createOrderDetail',
//   async ({data, userId}:{data: OrderDetail; userId?: number}, thunkAPI) => {
//     try {
//       let url = '/order-detail';
//       if (userId) {
//         url += `?userId=${userId}`;
//       }
//       const response = await http.post<ResponseData<OrderDetail>>(url, data)
//       return response.data.data
//     } catch (error: any) {
//       if (error.name === 'AbortError') {
//         return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
//       }
//       return thunkAPI.rejectWithValue(error.response?.data || error)
//     }
//   }
// )

type OrderDetailData = OrderDetail | { orderDetailRequestDTO: any }

export const createOrderDetail = createAsyncThunk(
  'orderDetail/createOrderDetail',
  async ({ data, userId }: { data: OrderDetailData; userId?: number }, thunkAPI) => {
    try {
      let url = '/order-detail'
      if (userId) {
        url += `?userId=${userId}`
        data = { orderDetailRequestDTO: data.orderDetailRequestDTO }
      }
      const response = await http.post<ResponseData<OrderDetail>>(url, data)
      return response.data.data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }
      return thunkAPI.rejectWithValue(error.response?.data || error)
    }
  }
)
