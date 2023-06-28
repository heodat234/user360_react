import { createSlice } from '@reduxjs/toolkit'

var userIDLogin = ''
if (sessionStorage.getItem('user') !== 'undefined' || sessionStorage.getItem('user') !== null) {
  const userLogin = JSON.parse(sessionStorage.getItem('user'))
  userIDLogin = userLogin && userLogin.ID ? userLogin.ID : ''
}
export const UserItemSlice = createSlice({
  name: 'userItem',
  initialState: {
    userItemSelected: '0',
    isLoading: false,
    listUserSearch: JSON.parse(localStorage.getItem('listUserSearch_' + userIDLogin)),
  },
  reducers: {
    activeUserItem: (state, action) => {
      state.userItemSelected = action.payload
      state.isLoading = true
    },
    setListUserSearch: (state, action) => {
      let newLastList = []
      let newLastListID = []
      if (localStorage.getItem('listUserIDSearch_' + userIDLogin) === null) {
        newLastList.push(action.payload)
        newLastListID.push(action.payload.ID)
      } else {
        const lastList = JSON.parse(localStorage.getItem('listUserSearch_' + userIDLogin))
        const lastListID = JSON.parse(localStorage.getItem('listUserIDSearch_' + userIDLogin))

        const newUsers = lastList.filter((user) => user.ID !== action.payload.ID)
        const newIDs = lastListID.filter((ID) => ID !== action.payload.ID)
        newLastList = [action.payload, ...newUsers]
        newLastListID = [action.payload.ID, ...newIDs]

        if (newLastListID.length > 5) {
          newLastList.pop()
          newLastListID.pop()
        }
      }

      if (newLastListID.length > 0) {
        state.listUserSearch = newLastList
        localStorage.setItem('listUserSearch_' + userIDLogin, JSON.stringify(newLastList))
        localStorage.setItem('listUserIDSearch_' + userIDLogin, JSON.stringify(newLastListID))
      }
    },
    setUserSearchDefault: (state, action) => {
      state.listUserSearch = action.payload
    },
  },
})

export const { activeUserItem, setListUserSearch, setUserSearchDefault } = UserItemSlice.actions

export const selectUserItem = (state) => state.userItem.userItemSelected

export const selectListUserSearch = (state) => state.userItem.listUserSearch

export const selectIsLoading = (state) => state.userItem.isLoading

export default UserItemSlice.reducer
