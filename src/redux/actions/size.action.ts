import { createAsyncThunk } from '@reduxjs/toolkit'

import { ResponseData } from '~/types/respone.type'
import { size } from '~/types/size.type'
import { http } from '~/utils/http'

interface GetSizesParams {
  signal: AbortSignal
}

export const getSizes = createAsyncThunk('size/getSizes', async ({ signal }: GetSizesParams, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<size[]>>(`/size/get-all/-1?pageSize=5&field=id`, {
      signal
    })
    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})

export const getSizeDetail = createAsyncThunk('color/getSizeDetail', async (id: number, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<size>>(`/size/${id}`, {})
    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})
