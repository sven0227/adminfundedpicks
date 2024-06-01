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
import { challengeStatusApi } from './api/challenge-status'
import { dashboardApi } from './api/dashboard'
import { challengeApi } from './api/challenge'

export const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [betApi.reducerPath]: betApi.reducer,
    [challengeStatusApi.reducerPath]: challengeStatusApi.reducer,
    [challengeApi.reducerPath]: challengeApi.reducer,
    user: userDataSlice,
    auth: auth,
    chatReducer,
    calendarReducer,
    kanbanReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      dashboardApi.middleware,
      authApi.middleware,
      userApi.middleware,
      purchaseApi.middleware,
      betApi.middleware,
      challengeStatusApi.middleware,
      challengeApi.middleware
    ])
})
