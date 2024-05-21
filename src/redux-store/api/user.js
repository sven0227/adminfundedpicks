import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url, user_url } from '../../utils/apiUrls'
import { queryFn } from '@/utils'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ['users', 'user'],
  endpoints: builder => ({
    getAllUsers: builder.query({
      queryFn: () => queryFn(user_url),
      providesTags: ['users']
    }),
    createUser: builder.mutation({
      query: data => ({
        url: user_url,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['users']
    }),
    getUser: builder.query({
      queryFn: id => queryFn(user_url + id)
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: user_url + id,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['users', 'user']
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: user_url + id,
        method: 'DELETE'
      }),
      invalidatesTags: ['users']
    })
  })
})

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi
