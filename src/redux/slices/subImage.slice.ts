import { createSlice } from "@reduxjs/toolkit";
import { initialSubImagetState } from "../types/subImage.type";
import { FulfilledAction, PendingAction, RejectedAction } from "~/types/redux.type";
import { getImageByProMaterialId } from "../actions/subImage.action";



const subImageSlice = createSlice({
  name: 'subImage',
  initialState: initialSubImagetState,
  reducers:{},

  extraReducers(builder) {
    builder
      .addCase(getImageByProMaterialId.fulfilled, (state, action)=> {
        state.loading = false
        state.subImageList = action.payload
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
  },

})

export default subImageSlice.reducer