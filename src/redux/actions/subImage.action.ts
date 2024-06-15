/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ResponseData } from '~/types/respone.type'
import { subImage } from '~/types/subImage.type'
import { http } from '~/utils/http'

export const getImageByProMaterialId = createAsyncThunk(
  'product/getImageByProMaterialId',
  async (id: number, thunkAPI) => {
    try {
      const response = await http.get<ResponseData<subImage[]>>(
        `/product-sub-image/productMaterialId?productMaterialId=${id}`,
        {}
      )
      return response.data.data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }
      return thunkAPI.rejectWithValue(error.response?.data || error)
    }
  }
)
