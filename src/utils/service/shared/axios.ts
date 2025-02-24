import axios, { AxiosInstance } from "axios";
export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const axiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return instance;
};
