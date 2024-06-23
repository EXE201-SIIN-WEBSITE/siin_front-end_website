import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ResponseData } from '~/types/respone.type'
import { http } from '~/utils/http'
import { getUserIdByToken, getUserInfo } from './user.actions'
import { auth } from '~/types/auth.type'

interface LoginPayload {
  email: string
  password: string
  username?: string
}

interface token {
  access_token: string
  refresh_token: string
}

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

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await http.post<ResponseData<{ access_token: string }>>('/auth/authenticate', {
        email,
        password
      })
      const token = response.data.data.access_token

      localStorage.setItem('token', token)

      const userIdAction = await thunkAPI.dispatch(getUserIdByToken(token))
      const userId = userIdAction.payload as number
      await thunkAPI.dispatch(getUserInfo(userId))

      return { token, userId }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      await http.post<ResponseData<auth>>(
        `/auth/logout?token=${token}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      localStorage.removeItem('token')
    }
    return null
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})
