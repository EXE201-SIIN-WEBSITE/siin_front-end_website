import { createSlice } from '@reduxjs/toolkit'

import { FulfilledAction, PendingAction, RejectedAction } from '~/types/redux.type'
import { initialAccessoryState } from '../types/accessory.type'
import { getAccessories, getAccessoryDetail } from '../actions/accessory.action'


const accessorySlice = createSlice({
  name: 'accessory',
  initialState: initialAccessoryState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getAccessories.fulfilled, (state, action) => {
        state.loading = false
        state.accessoryList = action.payload
      })

      .addCase(getAccessoryDetail.fulfilled, (state, action) => {
        state.loading = false
        state.accessory = action.payload
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

export default accessorySlice.reducer
