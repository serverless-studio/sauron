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
    createErrorSuppression: builder.mutation<ErrorSuppressionDTO, Omit<ErrorSuppressionDTO, 'createdAt'>>({
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
              ...result.map(({ functionName }) => ({ type: 'ErrorSuppression' as const, id: functionName })),
              'ErrorSuppression',
            ]
          : ['ErrorSuppression'],
    }),

    getErrorSuppressionById: builder.query<ErrorSuppressionDTO, string>({
      query: (functionName) => `/error-suppressions/${functionName}`,
      transformResponse: (response: ApiResponse<ErrorSuppressionDTO>) => response.data,
      providesTags: (_, __, functionName) => [{ type: 'ErrorSuppression', id: functionName }],
    }),

    updateErrorSuppression: builder.mutation<ErrorSuppressionDTO, { functionName: string; data: Omit<ErrorSuppressionDTO, 'functionName' | 'createdAt'> }>({
      query: ({ functionName, data }) => ({
        url: `/error-suppressions/${functionName}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: ApiResponse<ErrorSuppressionDTO>) => response.data,
      invalidatesTags: (_, __, arg) => [{ type: 'ErrorSuppression', id: arg.functionName }],
    }),

    deleteErrorSuppression: builder.mutation<void, string>({
      query: (functionName) => ({
        url: `/error-suppressions/${functionName}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, functionName) => [{ type: 'ErrorSuppression', id: functionName }],
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
