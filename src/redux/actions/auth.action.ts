import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginPayload, thunkAPI) => {
    try {
      const response = await axios.post('https://exe201-backend.click/api/v1/auth/authenticate', {
        email,
        password,
      });

      // console.log("Response data: ", response.data); 
      const token  = response.data.data.access_token;
      // console.log("Token: ", token); 
      localStorage.setItem('token', token);
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
  }
);
