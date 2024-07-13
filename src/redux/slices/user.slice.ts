import { createSlice } from '@reduxjs/toolkit'

import { FulfilledAction, PendingAction, RejectedAction } from '~/types/redux.type'
import { initialUserState } from '../types/user.type'
import { getUserIdByToken, getUserInfo } from '../actions/user.actions'
import { logout } from '../actions/auth.action'

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getUserIdByToken.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })

      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
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

export default userSlice.reducer
