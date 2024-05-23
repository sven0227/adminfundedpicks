import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url, getAuthToken, login_url } from '../../utils/apiUrls'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url
  }),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    logout: builder.query({
      query: () => ({
        url: 'auth/logout',
        headers: {
          Authorization: getAuthToken()
        }
      })
    }),
    register: builder.mutation({
      query: data => ({
        url: 'register_url',
        method: 'POST',
        body: data
      })
    }),
    login: builder.mutation({
      query: data => ({
        url: login_url,
        method: 'POST',
        body: data
      })
    })
  })
})

export const {
  useRegisterMutation,
  useGetIndustriesQuery,
  useLogoutQuery,
  useLoginMutation,
  useSendResetPasswordOtpMutation,
  useNewPasswordMutation,
  useVerifyOtpMutation
} = authApi
