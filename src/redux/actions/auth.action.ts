import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ResponseData } from '~/types/respone.type'
import { http } from '~/utils/http'

interface LoginPayload {
  email: string
  password: string
  username?: string
}

interface token {
  access_token: string
  refresh_token: string
}

export const login = createAsyncThunk('auth/login', async ({ email, password }: LoginPayload, thunkAPI) => {
  try {
    const response = await axios.post('https://exe201-backend.click/api/v1/auth/authenticate', {
      email,
      password
    })

    // console.log("Response data: ", response.data);
    const token = response.data.data.access_token
    // console.log("Token: ", token);
    localStorage.setItem('token', token)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
    return thunkAPI.rejectWithValue('An unexpected error occurred')
  }
})

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, username }: LoginPayload, thunkAPI) => {
    try {
      const res = await http.post<ResponseData<token>>('/auth/register', {
        email,
        password,
        username,
        status: true
      })
      localStorage.setItem('token', res.data.data.access_token)

      return res.data.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred')
    }
  }
)
