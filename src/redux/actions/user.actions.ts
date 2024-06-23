/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ResponseData } from '~/types/respone.type'
import { User } from '~/types/user.type'
import { http } from '~/utils/http'

export const getUserIdByToken = createAsyncThunk('user/getUserIdByToken', async (token: string, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<User>>(`/user/getUserIdByToken?token=${token}`, {})
    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})

export const getUserInfo = createAsyncThunk('user/getUserInfo', async (id: number, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<User>>(`/user/${id}`, {})
    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})
