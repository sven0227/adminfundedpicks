import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url, purchase_url } from '../../utils/apiUrls'
import { queryFn } from '@/utils'

export const purchaseApi = createApi({
  reducerPath: 'purchaseApi',
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ['purchases', 'purchase'],
  endpoints: builder => ({
    getAllPurchases: builder.query({
      queryFn: () => queryFn(purchase_url),
      providesTags: ['purchases']
    }),
    createPurchase: builder.mutation({
      query: data => ({
        url: purchase_url,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['purchases', 'purchase']
    }),
    getPurchase: builder.query({
      queryFn: id => queryFn(`${purchase_url}${id}`)
    }),
    updatePurchase: builder.mutation({
      query: ({ id, data }) => ({
        url: `${purchase_url}${id}/`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['purchases', 'purchase']
    }),
    deletePurchase: builder.mutation({
      query: id => ({
        url: `${purchase_url}${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['purchases']
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
