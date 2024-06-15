/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { accessory } from '~/types/accessory.type'
import { ResponseData } from '~/types/respone.type'
import { http } from '~/utils/http'

interface GetAccessoriesParams {
  signal: AbortSignal
}

export const getAccessories = createAsyncThunk(
  'accessory/getAccessories',
  async ({ signal }: GetAccessoriesParams, thunkAPI) => {
    try {
      const response = await http.get<ResponseData<accessory[]>>(`/accessory/get-all/-1?pageSize=5&field=name`, {
        signal
      })
      return response.data.data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }
      return thunkAPI.rejectWithValue(error.response?.data || error)
    }
  }
)

export const getAccessoryDetail = createAsyncThunk('accessory/getAccessoryDetail', async (id: number, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<accessory>>(`/accessory/${id}`, {})
    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})
