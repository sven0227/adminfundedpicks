import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url, getAuthToken, user_url } from '../../utils/apiUrls';
import { queryFn } from '@/utils';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    headers: {
      Authorization: getAuthToken()
    }
  }),
  tagTypes: ['users', 'user'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      queryFn: () => queryFn(user_url),
      providesTags: ['users']
    }),
    createUser: builder.mutation({
      query: ({ firstName, lastName, email, amount, password }) => {
        const params = ['package=demo-account'];
        if (firstName) params.push(`first_name=${firstName}`);
        if (lastName) params.push(`last_name=${lastName}`);
        if (email) params.push(`user=${email}`);
        if (amount) params.push(`amount_subtotal=${amount}`);
        if (password) params.push(`password=${password}`);
        const queryString = params.length ? `?${params.join('&')}` : '';
        return {
          url: `/create_demo_account${queryString}`,
          method: 'GET'
        };
      },
      invalidatesTags: ['users']
    }),
    getUser: builder.query({
      queryFn: (id) => queryFn(`${user_url}${id}`)
    }),
    getUserDocs: builder.query({
      queryFn: (id) => queryFn(`get_user_documents/${id}`)
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${user_url}${id}/`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['users', 'user']
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${user_url}${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['users']
    })
  })
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi;
