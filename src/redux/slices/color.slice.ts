import { createSlice } from '@reduxjs/toolkit'

import { FulfilledAction, PendingAction, RejectedAction } from '~/types/redux.type'
import { initialColorState } from '../types/color.type'
import { getColorDetail, getColors } from '../actions/color.action'

const colorSlice = createSlice({
  name: 'color',
  initialState: initialColorState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getColors.fulfilled, (state, action) => {
        state.loading = false
        state.colorList = action.payload
      })

      .addCase(getColorDetail.fulfilled, (state, action) => {
        state.loading = false
        state.color = action.payload
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

export default colorSlice.reducer
