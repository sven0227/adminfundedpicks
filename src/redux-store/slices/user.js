import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null
}

// add login data in redux
const userDataSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.data = payload
    },
    resetCreateContractData: () => initialState
  }
})

export const { setUserData, resetCreateContractData } = userDataSlice.actions

export default userDataSlice.reducer
