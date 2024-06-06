import { createAsyncThunk } from '@reduxjs/toolkit'
import { color } from '~/types/color.type'

import { ResponseData } from '~/types/respone.type'
import { http } from '~/utils/http'

interface GetColorsParams {
  signal: AbortSignal
}

export const getColors = createAsyncThunk('color/getColors', async ({ signal }: GetColorsParams, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<color[]>>(`/color/get-all/-1?pageSize=5&field=id`, {
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


