import { createSlice } from '@reduxjs/toolkit'
import { initialPaymentPayOS } from '../types/paymentPayOS.type'
import { FulfilledAction, PendingAction, RejectedAction } from '~/types/redux.type'
import { createPaymentPayOS } from '../actions/paymentPayOS.action'

export const PaymentPayOS = createSlice({
  name: 'paymentPayOS',
  initialState: initialPaymentPayOS,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentPayOS.fulfilled, (state, action) => {
        state.payment = action.payload
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false
          state.error = action.payload
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false
          state.error = null
        }
      )
  }
})

export default PaymentPayOS.reducer
