import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSession } from "../sessionService";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    responseHandler: async (response) => {
      return response.text();
    },
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        return { message: response };
      },
      onQueryStarted: async (credentials, { queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          if (result.data.message === "OK") {
            createSession(credentials.name);
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      transformResponse: (response) => {
        return { message: response };
      },
      onQueryStarted: async ({ queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          if (result.data.message === "OK") {
            return result;
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authAPI;
