import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url, dashboard_url, getAuthToken, login_url } from '../../utils/apiUrls'
import { queryFn } from '@/utils'

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url
  }),
  tagTypes: ['Dashboard'],
  endpoints: builder => ({
    getDashboardData: builder.query({
      queryFn: () => queryFn(dashboard_url)
    })
  })
})

export const { useGetDashboardDataQuery } = dashboardApi
