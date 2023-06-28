import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import userItemReducer from './userItemSlice'
import modalReducer from './modalSlice'
import ProjectReducer from './projectSlice'
import fraudReducer from './fraudSlice'

const store = configureStore({
  reducer: {
    user: userReducer, // Khai báo 1 slide tên là user với giá trị là userReducer được export ở file userSlice
    userItem: userItemReducer,
    modal: modalReducer,
    project: ProjectReducer,
    fraud: fraudReducer,
  },
})
export default store
