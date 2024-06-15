/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { payment } from '~/types/payment.type'
import { ResponseData } from '~/types/respone.type'

import { http } from '~/utils/http'

export const createPayment = createAsyncThunk('payment/createPayment', async (data: payment, thunkAPI) => {
  try {
    const respone = await http.post<ResponseData<payment>>(`/payment`, data)
    return respone.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})
