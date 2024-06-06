  import { createSlice } from "@reduxjs/toolkit";
  import { initialOrderDetailState } from "../types/orderDetail.type";
  import { createOrderDetail } from "../actions/orderDetail.action";
  import { FulfilledAction, PendingAction, RejectedAction } from "~/types/redux.type";



  const orderDetailSlice = createSlice({
    name:'orderDetail',
    initialState: initialOrderDetailState,
    reducers:{},

    extraReducers(builder) {
      builder
        .addCase(createOrderDetail.fulfilled, (state, action) => {
          state.loading = false
          state.orderDetail = action.payload
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

  export default orderDetailSlice.reducer