// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'

// Slice Imports
import chatReducer from '@/redux-store/slices/chat'
import calendarReducer from '@/redux-store/slices/calendar'
import kanbanReducer from '@/redux-store/slices/kanban'
import { userApi } from './api/user'
import userDataSlice from './slices/user'
import { purchaseApi } from './api/purchase'
import { authApi } from './api/auth'
import { betApi } from './api/bet'
import auth from './slices/auth'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [betApi.reducerPath]: betApi.reducer,
    user: userDataSlice,
    auth: auth,
    chatReducer,
    calendarReducer,
    kanbanReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      userApi.middleware,
      purchaseApi.middleware,
      betApi.middleware
    ])
})
