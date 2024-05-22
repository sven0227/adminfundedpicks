// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'

// Slice Imports
import chatReducer from '@/redux-store/slices/chat'
import calendarReducer from '@/redux-store/slices/calendar'
import kanbanReducer from '@/redux-store/slices/kanban'
import { userApi } from './api/user'
import userDataSlice from './slices/user'
import { purchaseApi } from './api/purchase'
// import { betApi } from './api/bet'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userDataSlice,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    // [betApi.reducerPath]: betApi.reducer,
    chatReducer,
    calendarReducer,
    kanbanReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      userApi.middleware,
      purchaseApi.middleware
      // betApi.middleware
    ])
})
