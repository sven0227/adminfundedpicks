import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url, getAuthToken, payout_url, payout_detail_url, payout_update_url } from '../../utils/apiUrls';
import { queryFn } from '@/utils';

export const payoutApi = createApi({
  reducerPath: 'payoutApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    headers: {
      Authorization: getAuthToken()
    }
  }),
  tagTypes: ['payouts', 'payout'],
  endpoints: (builder) => ({
    getAllPayouts: builder.query({
      queryFn: () => queryFn(payout_url),
      providesTags: ['payouts']
    }),
    getPayoutDetail: builder.query({
      queryFn: (id) => queryFn(payout_detail_url+id+"/"),
      providesTags: ['payouts']
    }),
    updatePayout: builder.mutation({
      query: ({ id, data }) => ({
        url: `${payout_update_url}${id}/`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['users', 'user']
    })
  })
});

export const {
  useGetAllPayoutsQuery, useGetPayoutDetailQuery, useUpdatePayoutMutation
} = payoutApi;
