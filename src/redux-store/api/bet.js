import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url } from '../../utils/apiUrls'
import { queryFn } from '@/utils'

export const betApi = createApi({
  reducerPath: 'betApi',
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ['bets', 'bet'],
  endpoints: builder => ({
    getAllBets: builder.query({
      query: () => queryFn(bet_url)
    }),
    createBet: builder.mutation({
      query: data => ({
        url: bet_url,
        method: 'POST',
        body: data
      })
    }),
    getBet: builder.query({
      queryFn: () => queryFn(bet_url)
    }),
    updateBet: builder.mutation({
      query: data => ({
        url: bet_url,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['bets', 'bet']
    }),
    deleteBet: builder.mutation({
      query: data => ({
        url: bet_url,
        method: 'POST',
        body: data,
        invalidatesTags: ['bets']
      })
    })
  })
})

export const { useCreateBetMutation, useGetAllBetsQuery, useGetBetQuery, useUpdateBetMutation, useDeleteBetMutation } =
  betApi
