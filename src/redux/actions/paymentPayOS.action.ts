import { createAsyncThunk } from '@reduxjs/toolkit'
import { PaymentPayOS } from '~/types/payment.type'
import { ResponseData } from '~/types/respone.type'
import { paymentApi } from '~/utils/http'

export const createPaymentPayOS = createAsyncThunk(
  'paymentPayOS/createPaymentPayOS',
  async ({ id, signal }: { id: number; signal: AbortSignal }, thunkAPI) => {
    try {
      const res = await paymentApi.post<ResponseData<PaymentPayOS>>(`${id}`, {
        signal
      })
      return res.data.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }
      return thunkAPI.rejectWithValue(error.response?.data || error)
    }
  }
)
