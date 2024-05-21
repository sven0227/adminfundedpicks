import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  base_url,
  change_password_url,
  getAuthToken,
  industry_url,
  login_url,
  register_url,
  send_reset_password_otp_url,
  verify_reset_password_otp_url
} from '../../utils/apiUrls'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    getIndustries: builder.query({
      query: () => industry_url
    }),
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
        url: register_url,
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
    }),
    sendResetPasswordOtp: builder.mutation({
      query: data => ({
        url: send_reset_password_otp_url,
        method: 'POST',
        body: data
      })
    }),
    newPassword: builder.mutation({
      query: data => ({
        url: change_password_url,
        method: 'POST',
        body: data
      })
    }),
    verifyOtp: builder.mutation({
      query: data => ({
        url: verify_reset_password_otp_url,
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
