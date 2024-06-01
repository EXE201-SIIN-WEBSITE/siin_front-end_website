import { createSlice } from "@reduxjs/toolkit";

import { FulfilledAction, PendingAction, RejectedAction } from "~/types/redux.type";
import { initialPaymentState } from "../types/payment.type";
import { createPayment } from "../actions/payment.action";



const paymentSlice = createSlice({
  name:'payment',
  initialState: initialPaymentState,
  reducers:{},

  extraReducers(builder) {
    builder
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false
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

export default paymentSlice.reducer