import { createSlice } from '@reduxjs/toolkit'

export const ProjectSlice = createSlice({
  name: 'project',
  initialState: {
    detailID: null,
    category: 0,
    visibleModal: false,
  },
  reducers: {
    setDetailId: (state, action) => {
      state.detailID = action.payload
    },
    setVisibleModal: (state, action) => {
      state.visibleModal = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
  },
})

export const { setDetailId, setVisibleModal, setCategory } = ProjectSlice.actions

export const getDetailID = (state) => state.project.detailID

export const getVisibleModal = (state) => state.project.visibleModal

export const getCategory = (state) => state.project.category

export default ProjectSlice.reducer
