import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
  isLoading: false,
  errorMessage: '',
  currentUser:
    sessionStorage.getItem('user') !== 'undefined' || sessionStorage.getItem('user') !== null
      ? JSON.parse(sessionStorage.getItem('user'))
      : null,
}

export const login = createAsyncThunk(
  // Tên action
  'user/login',

  // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
  async (data, { rejectWithValue }) => {
    // Gọi lên API backend
    const response = await fetch(
      // process.env.REACT_APP_API_ENDPOINT + '/login',
      'https://appay.cloudcms.vn/app_api_v1/user360/login',
      {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Headers': '*', // this will allow all CORS requests
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET', // this states the allowed methods
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
    // Convert dữ liệu ra json
    const jsonData = await response.json()

    // Nếu bị lỗi thì reject
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(jsonData)
    }

    // Còn không thì trả về dữ liệu
    return jsonData
  },
)

// Cấu hình slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      return {
        isLoading: false,
        errorMessage: '',
        currentUser: '',
      }
    },
  },
  extraReducers: (builder) => {
    // Start login request
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })

    // Request successful
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false

      if (action.payload.status) {
        // state.isAuthenticated = true;
        state.currentUser = action.payload.data
        sessionStorage.setItem('user', JSON.stringify(action.payload.data))
      } else {
        state.errorMessage = action.payload.message
      }
    })

    // Request error
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload.message
    })
  },
})

// Export actions
export const { logout } = userSlice.actions

// Select state currentUser from slice
export const selectUser = (state) => state.user.currentUser
export const selectLoading = (state) => state.user.isLoading
export const selectErrorMessage = (state) => state.user.errorMessage

// Export reducer
export default userSlice.reducer
