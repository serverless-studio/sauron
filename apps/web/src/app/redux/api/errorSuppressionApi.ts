import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ErrorSuppressionDTO } from '@sauron/types';
import { SAURON_API_URL } from '../../env';

// Define a type for the API response structure
interface ApiResponse<T> {
  data: T;
}

export const errorSuppressionApi = createApi({
  reducerPath: 'errorSuppressionApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${SAURON_API_URL}/v1` }),
  tagTypes: ['ErrorSuppression'],

  endpoints: (builder) => ({
    // Create
    createErrorSuppression: builder.mutation<ErrorSuppressionDTO, Omit<ErrorSuppressionDTO, 'id' | 'createdAt'>>({
      query: (newErrorSuppression) => ({
        url: '/error-suppressions',
        method: 'POST',
        body: newErrorSuppression,
      }),
      invalidatesTags: ['ErrorSuppression'],
      transformResponse: (response: ApiResponse<ErrorSuppressionDTO>) => response.data,
    }),

    getErrorSuppressions: builder.query<ErrorSuppressionDTO[], void>({
      query: () => '/error-suppressions',
      transformResponse: (response: ApiResponse<ErrorSuppressionDTO[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'ErrorSuppression' as const, id })),
              'ErrorSuppression',
            ]
          : ['ErrorSuppression'],
    }),

    getErrorSuppressionById: builder.query<ErrorSuppressionDTO, string>({
      query: (id) => `/error-suppressions/${id}`,
      transformResponse: (response: ApiResponse<ErrorSuppressionDTO>) => response.data,
      providesTags: (_, __, id) => [{ type: 'ErrorSuppression', id }],
    }),

    updateErrorSuppression: builder.mutation<ErrorSuppressionDTO, { id: string; data: Omit<ErrorSuppressionDTO, 'id' | 'createdAt'> }>({
      query: ({ id, data }) => ({
        url: `/error-suppressions/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: ApiResponse<ErrorSuppressionDTO>) => response.data,
      invalidatesTags: (_, __, arg) => [{ type: 'ErrorSuppression', id: arg.id }],
    }),

    deleteErrorSuppression: builder.mutation<void, string>({
      query: (id) => ({
        url: `/error-suppressions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'ErrorSuppression', id }],
    }),
  }),
});

export const {
  useGetErrorSuppressionsQuery,
  useGetErrorSuppressionByIdQuery,
  useCreateErrorSuppressionMutation,
  useUpdateErrorSuppressionMutation,
  useDeleteErrorSuppressionMutation,
} = errorSuppressionApi;
