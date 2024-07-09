/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { product } from '~/types/product.type'
import { ResponseData, ResponseData2 } from '~/types/respone.type'
import { http } from '~/utils/http'

interface GetProductsParams {
  signal: AbortSignal
}

interface GetProductsParams2 {
  signal: AbortSignal
  currentPage: number
  
  // pageSize: number,
  // categoryId: number,
}

// export const getProduct = createAsyncThunk('product/getProduct', async (_, thunkAPI) => {
//   const respone = await http.get<ResponseSuccessful<product[]>>('product/get-all/-1', {
//     signal: thunkAPI.signal
//   })
//   return respone.data.data;
// })

export const getProducts = createAsyncThunk('product/getProducts', async ({ signal }: GetProductsParams, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<product[]>>(`/product/get-all-excluding-customize/-1?pageSize=5&field=name`, {
      signal // Pass the abort signal for request cancellation
    })
    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})

export const getProducts2 = createAsyncThunk(
  'product/getProducts2',
  async ({ signal, currentPage }: GetProductsParams2, thunkAPI) => {
    try {
      const response = await http.get<ResponseData2<product[]>>(
        `/product/get-all-excluding-customize/{currentPage}${currentPage}`,
        {
          params: {
            currentPage,
            pageSize: 5,
            field: 'name',
            categoryId: 0
          },
          signal
        }
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

export const getProductDetail = createAsyncThunk('product/getProductDetail', async (id: number, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<product>>(`/product/${id}`, {})
    console.log('dtat: ', response)

    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})
