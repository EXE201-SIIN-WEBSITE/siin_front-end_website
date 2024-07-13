import { createSlice } from '@reduxjs/toolkit'

import { FulfilledAction, PendingAction, RejectedAction } from '~/types/redux.type'
import { initialSizeState } from '../types/size.type'
import { getSizeDetail, getSizes } from '../actions/size.action'

const sizeSlice = createSlice({
  name: 'size',
  initialState: initialSizeState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getSizes.fulfilled, (state, action) => {
        state.loading = false
        state.sizeList = action.payload
      })

      .addCase(getSizeDetail.fulfilled, (state, action) => {
        state.loading = false
        state.size = action.payload
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

export default sizeSlice.reducer
