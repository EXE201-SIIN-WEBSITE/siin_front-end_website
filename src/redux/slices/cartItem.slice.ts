import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { FulfilledAction, PendingAction, RejectedAction } from '~/types/redux.type'
import { initialCartItemState } from '../types/cartItem.type'
import { createCartItem, createCartItem2 } from '../actions/cartItem.action'

const cartItemSlice = createSlice({
  name: 'cartItem',
  initialState: initialCartItemState,
  reducers: {
    clearCart: (state) => {
      state.cartItemList = []
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.cartItemList = state.cartItemList.filter((_, index) => index !== action.payload)
    }
  },

  extraReducers(builder) {
    builder
      .addCase(createCartItem.fulfilled, (state, action) => {
        state.loading = false
        state.cartItemList.push(action.payload)
        // state.cartItem = action.payload
      })

      .addCase(createCartItem2.fulfilled, (state, action) => {
        state.loading = false
        state.cartItemList.push(action.payload)
        // state.cartItem = action.payload
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

// export const { clearCart, removeItemFromCart } = cartItemSlice.actions
export default cartItemSlice.reducer
