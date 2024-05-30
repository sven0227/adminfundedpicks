import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url, getAuthToken, challenge_url } from '../../utils/apiUrls'
import { queryFn } from '@/utils'

export const challengeApi = createApi({
  reducerPath: 'challengeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    headers: {
      Authorization: getAuthToken()
    }
  }),
  tagTypes: ['challenges', 'challenge'],
  endpoints: builder => ({
    getAllChallenges: builder.query({
      queryFn: () => queryFn(challenge_url),
      providesTags: ['challenges']
    }),
    createChallenge: builder.mutation({
      query: data => ({
        url: challenge_url,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['challenges', 'challenge']
    }),
    getChallenge: builder.query({
      queryFn: id => queryFn(`${challenge_url}${id}`)
    }),
    updateChallenge: builder.mutation({
      query: ({ id, data }) => ({
        url: `${challenge_url}${id}/`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['challenges', 'challenge']
    }),
    deleteChallenge: builder.mutation({
      query: id => ({
        url: `${challenge_url}${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['challenges']
    })
  })
})

export const {
  useCreateChallengeMutation,
  useGetAllChallengesQuery,
  useGetChallengeQuery,
  useUpdateChallengeMutation,
  useDeleteChallengeMutation
} = challengeApi
