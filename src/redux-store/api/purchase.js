import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url, getAuthToken, purchase_url } from '../../utils/apiUrls'
import { queryFn } from '@/utils'

export const purchaseApi = createApi({
  reducerPath: 'purchaseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    headers: {
      Authorization: getAuthToken()
    }
  }),
  tagTypes: ['purchases', 'purchase'],
  endpoints: builder => ({
    getAllPurchases: builder.query({
<<<<<<< Updated upstream
      queryFn: () => queryFn(purchase_url),
=======
      query: ({ startDate, endDate }) => {
        const params = [];
        if (startDate) params.push(`created_at_after=${startDate}`);
        if (endDate) params.push(`created_at_before=${endDate}`);
        const queryString = params.length ? `?${params.join('&')}` : '';
        return {
          url: `${purchase_url}${queryString}`,
          method: 'GET'
        };
      },
>>>>>>> Stashed changes
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
