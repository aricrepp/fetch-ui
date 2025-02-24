import { AxiosResponse } from "axios";
import { axiosInstance } from ".";
import {
  setSearchResults,
  setDogsFromSearchResults,
} from "@/store/dogStore/reducer";
import { Dog, SearchResponse } from "@/types";
import { Dispatch } from "@reduxjs/toolkit";
import { Match } from "@/types";

const BASE_URL = "dogs";

type DogBreeds = string[];

export const dogsService = {
  getDogs: async () => {
    try {
      const response: AxiosResponse<DogBreeds> =
        await axiosInstance().get<DogBreeds>(`${BASE_URL}/breeds`, {
          withCredentials: true,
        });

      if (response && response?.data) return response.data;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch dog breeds");
    }
  },
  getAllDogsWithIDs: async (
    dispatch: Dispatch,
    queryParams?: string
  ): Promise<Dog[] | undefined> => {
    try {
      let response: AxiosResponse<SearchResponse>;
      if (queryParams !== undefined) {
        response = await axiosInstance().get<SearchResponse>(
          `${BASE_URL}/search?${queryParams}`,
          {
            withCredentials: true,
          }
        );
      } else {
        response = await axiosInstance().get<SearchResponse>(
          `${BASE_URL}/search`,
          {
            withCredentials: true,
          }
        );
      }

      if (!response || !response.data) {
        throw new Error("Failed to fetch dog search");
      } else {
        dispatch(setSearchResults(response.data));
      }

      const finalResponse: AxiosResponse<Dog[]> = await axiosInstance().post<
        Dog[]
      >(`${BASE_URL}`, response.data.resultIds, {
        withCredentials: true,
      });

      if (!finalResponse || !finalResponse.data) {
        throw new Error("Failed to fetch dog details");
      }

      if (queryParams !== undefined && response.data && finalResponse.data) {
        dispatch(setDogsFromSearchResults(finalResponse.data));
        return finalResponse.data;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      throw new Error("Failed to get dog data");
    }
  },
  getDogsMatch: async (dogs: string[]) => {
    try {
      const response: AxiosResponse<Match> = await axiosInstance().post<Match>(
        `${BASE_URL}/match`,
        dogs,
        {
          withCredentials: true,
        }
      );

      if (response && response?.data) return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      throw new Error("Failed to fetch dog breeds");
    }
  },
};
