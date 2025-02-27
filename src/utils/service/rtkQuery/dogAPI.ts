import {
  setDataFromRTK,
  setDogMatch,
  setDogsFromSearchResults,
  setSearchResults,
} from "@/store/dogStore/reducer";
import { Dog, SearchResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
type DogBreeds = string[];

interface DogData {
  search: SearchResponse;
  allDogs: Dog[];
}

export const dogAPI = createApi({
  reducerPath: "dogAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getDogBreeds: builder.query<DogBreeds, void>({
      query: () => "/dogs/breeds",
    }),
    getDogMatch: builder.mutation({
      query: (dogs: string[]) => ({
        url: "/dogs/match",
        method: "POST",
        body: dogs,
      }),
      onQueryStarted: async (dogs, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            console.log(result.data);

            dispatch(setDogMatch(result.data));
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
    getAllDogsWithIDs: builder.mutation({
      query: (IDs) => ({
        url: "/dogs",
        method: "POST",
        body: IDs,
      }),
      onQueryStarted: async (IDs, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(setDogsFromSearchResults(result.data));
            return result.data;
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
    getAllDogsFromSearch: builder.query({
      query: (queryParams = "") =>
        `${
          queryParams.length ? "/dogs/search/?" + queryParams : "/dogs/search"
        }`,
      onQueryStarted: async (queryParams, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(setSearchResults(result.data));
            dispatch(
              dogAPI.endpoints.getAllDogsWithIDs.initiate(result.data.resultIds)
            );
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),

    getAllDogs: builder.query<DogData, string | void>({
      async queryFn(
        searchParams: string | void,
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) {
        const searchUrl = searchParams
          ? `/dogs/search?${searchParams}`
          : "/dogs/search";
        const getSearchResults = await fetchWithBQ(searchUrl);
        if (getSearchResults.error) {
          return { error: getSearchResults.error as FetchBaseQueryError };
        }
        const searchResults = getSearchResults.data as SearchResponse;
        const allDogs = await fetchWithBQ({
          url: "/dogs",
          method: "POST",
          body: searchResults.resultIds,
        });
        return allDogs.data
          ? {
              data: {
                search: searchResults as SearchResponse,
                allDogs: allDogs.data as Dog[],
              },
            }
          : { error: allDogs.error as FetchBaseQueryError };
      },
      onQueryStarted: async (queryParams, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(setDataFromRTK(result.data));
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useGetDogBreedsQuery,
  useGetDogMatchMutation,
  useGetAllDogsFromSearchQuery,
  useGetAllDogsWithIDsMutation,
  useGetAllDogsQuery,
  useLazyGetAllDogsQuery,
} = dogAPI;
