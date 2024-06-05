import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url, bet_url, getAuthToken } from '../../utils/apiUrls'
import { queryFn } from '@/utils'

export const betApi = createApi({
  reducerPath: 'betApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    headers: {
      Authorization: getAuthToken()
    }
  }),
  tagTypes: ['bets', 'bet'],
  endpoints: builder => ({
    getAllBets: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `${bet_url}?created_at_after=${startDate}&created_at_before=${endDate}`,
        method: 'GET'
      }),
      providesTags: ['bets', 'bet']
    }),
    createBet: builder.mutation({
      query: data => ({
        url: bet_url,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['bets']
    }),
    getBet: builder.query({
      queryFn: id => queryFn(bet_url + id)
    }),
    updateBet: builder.mutation({
      query: ({ id, data }) => ({
        url: `${bet_url}${id}/`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['bets', 'bet']
    }),
    deleteBet: builder.mutation({
      query: id => ({
        url: `${bet_url}${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['bets']
    })
  })
})

export const { useCreateBetMutation, useGetAllBetsQuery, useGetBetQuery, useUpdateBetMutation, useDeleteBetMutation } =
  betApi
