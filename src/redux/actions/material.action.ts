import { createAsyncThunk } from '@reduxjs/toolkit'
import { material } from '~/types/material.type'
import { ResponseData } from '~/types/respone.type'
import { http } from '~/utils/http'

interface GetMaterialsParams {
  signal: AbortSignal
}


export const getMaterials = createAsyncThunk('material/getMaterials', async ({ signal }: GetMaterialsParams, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<material[]>>(`/product-material/get-all/-1?pageSize=5&field=id`, {
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

export const getProductMaterial = createAsyncThunk('material/getProductMaterial', async (id: number, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<material>>(`/product-material/get-by-productId/${id}`, {})
    // console.log('dtat: ', response)

    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})

export const getProductMaterialDetail = createAsyncThunk('material/getProductMaterialDetail', async (id: number, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<material>>(`/product-material/${id}`, {})
    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})






