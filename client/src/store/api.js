import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.NODE_ENV === 'production'
  ? ''
  : import.meta.env.VITE_BASE_URL;

export const api = createApi({
  reducerPath: 'UserApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      headers.set('Content-Type', 'application/json');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User', 'Register', 'Login', 'Dashboard'],

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'auth/registerUser',
        method: 'POST',
        body: userData,
      }),
    }),

    loginUser: builder.mutation({
      query: (userData) => ({
        url: 'auth/loginUser',
        method: 'POST',
        body: userData,
      }),
    }),

    getUser: builder.query({
      query: () => 'auth/get-user-data',
      providesTags: (result, error, id) => [{ type: 'Dashboard', id }],
    }),
  }),
});


export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery
} = api;

export const apiReducer = api.reducer;
