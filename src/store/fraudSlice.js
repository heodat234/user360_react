import { createSlice } from '@reduxjs/toolkit'

export const FraudSlice = createSlice({
  name: 'fraud',
  initialState: {
    detailID: null,
    visibleModal: false,
    reload: false,
  },
  reducers: {
    setDetailID: (state, action) => {
      state.detailID = action.payload
    },
    setVisibleModal: (state, action) => {
      state.visibleModal = action.payload
    },
    setReload: (state, action) => {
      state.reload = action.payload
    },
  },
})

export const { setDetailID, setVisibleModal, setReload } = FraudSlice.actions

export const getDetailID = (state) => state.fraud.detailID

export const getVisibleModal = (state) => state.fraud.visibleModal

export const getReload = (state) => state.fraud.reload

export default FraudSlice.reducer
