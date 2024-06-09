import { createSlice } from '@reduxjs/toolkit'

import { FulfilledAction, PendingAction, RejectedAction } from '~/types/redux.type'
import { getMaterials, getProductMaterial, getProductMaterialDetail } from '../actions/material.action'
import { initialMaterialState } from '../types/material.type'

const materialSlice = createSlice({
  name: 'material',
  initialState: initialMaterialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.loading = false
        state.materialList = action.payload
      })

      .addCase(getProductMaterial.fulfilled, (state, action) => {
        state.loading = false
        state.material = action.payload
      })

      .addCase(getProductMaterialDetail.fulfilled, (state, action) => {
        state.loading = false
        state.material = action.payload
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

export default materialSlice.reducer
