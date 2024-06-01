import { createAsyncThunk } from '@reduxjs/toolkit'
import { ResponseData } from '~/types/respone.type'
import { subImage } from '~/types/subImage.type'
import { http } from '~/utils/http'

export const getSubImageByProId = createAsyncThunk('product/getSubImageByProId', async (id: number, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<subImage[]>>(`/product-sub-image/productId?productId=${id}`, {
    })
    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})
