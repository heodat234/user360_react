import { createSlice } from '@reduxjs/toolkit'

export const ModalSlice = createSlice({
  name: 'modal',
  initialState: {
    visibleSlide: false,
    visibleLoading: false,
    visibleRight: false,
    templateModalRight: '',
    imageIndex: -1,
  },
  reducers: {
    setVisibleSlide: (state, action) => {
      state.visibleSlide = action.payload
    },
    setVisibleLoading: (state, action) => {
      state.visibleLoading = action.payload
    },
    setVisibleRight: (state, action) => {
      state.visibleRight = action.payload
    },
    setTemplateModalRight: (state, action) => {
      state.templateModalRight = action.payload
    },
    setImageIndex: (state, action) => {
      state.imageIndex = action.payload
    },
  },
})

export const {
  setVisibleSlide,
  setVisibleLoading,
  setVisibleRight,
  setTemplateModalRight,
  setImageIndex,
} = ModalSlice.actions

export const selectVisible = (state) => state.modal.visibleSlide
export const selectVisibleLoading = (state) => state.modal.visibleLoading
export const selectVisibleRight = (state) => state.modal.visibleRight
export const selectTemplateModalRight = (state) => state.modal.templateModalRight
export const selectImageIndex = (state) => state.modal.imageIndex

export default ModalSlice.reducer
