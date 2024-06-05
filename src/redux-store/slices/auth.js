import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
  isLoading: true,
  resetPasswordEmail: '',
  otp: '',
  aqrTestToken: null,
  isLogout: false
}

// add login data in redux
const loginDataSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginData: (state, { payload }) => {
      state.data = payload
      state.isLoading = false
      state.isLogout = false
    },
    setAqrTestToken: (state, { payload }) => {
      state.aqrTestToken = payload
    },
    logout: state => {
      state.data = null
      state.isLoading = true
      state.isLogout = true
    },
    setResetPasswordEmail: (state, { payload }) => {
      state.resetPasswordEmail = payload
    }
  }
})

export const { setLoginData, logout, setResetPasswordEmail, setAqrTestToken } = loginDataSlice.actions

export default loginDataSlice.reducer
