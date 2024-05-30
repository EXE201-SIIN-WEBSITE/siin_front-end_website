import { createSlice } from '@reduxjs/toolkit'
import { initialProductState } from '../types/product.type'
import { getProductDetail, getProducts } from '../actions/product.action'
import { FulfilledAction, PendingAction, RejectedAction } from '~/types/redux.type'

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    // startEditingArea: (state, action: PayloadAction<number>) => {
    // }
  },

  extraReducers(builder) {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false
        state.productList = action.payload
      })

      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false
        state.productDetail = action.payload
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

export default productSlice.reducer
