import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url, purchase_url } from '../../utils/apiUrls'
import { queryFn } from '@/utils'

export const purchaseApi = createApi({
  reducerPath: 'purchaseApi',
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ['purchases', 'purchase'],
  endpoints: builder => ({
    getAllPurchases: builder.query({
      query: () => queryFn(purchase_url)
    }),
    createPurchase: builder.mutation({
      query: data => ({
        url: purchase_url,
        method: 'POST',
        body: data
      })
    }),
    getPurchase: builder.query({
      queryFn: () => queryFn(purchase_url)
    }),
    updatePurchase: builder.mutation({
      query: data => ({
        url: purchase_url,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['purchases', 'purchase']
    }),
    deletePurchase: builder.mutation({
      query: data => ({
        url: purchase_url,
        method: 'POST',
        body: data,
        invalidatesTags: ['purchases']
      })
    })
  })
})

export const {
  useCreatePurchaseMutation,
  useGetAllPurchasesQuery,
  useGetPurchaseQuery,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation
} = purchaseApi
