import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url, challenge_status_url, getAuthToken } from '../../utils/apiUrls'

export const challengeStatusApi = createApi({
  reducerPath: 'challengeStatusApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    Authorization: getAuthToken()
  }),
  tagTypes: ['withdraw-profit'],
  endpoints: builder => ({
    getChallengeStatus: builder.query({
      query: () => ({
        url: challenge_status_url,
        headers: {
          Authorization: getAuthToken()
        }
      })
    })
  })
})

export const { useGetChallengeStatusQuery } = challengeStatusApi
