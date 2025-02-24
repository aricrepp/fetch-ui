import { axiosInstance } from ".";
import { FormFields } from "@/app/login/_components/form/schema";
import { createSession, deleteSession } from ".";
import { AxiosResponse } from "axios";

const BASE_URL = "auth";

export const authService = {
  login: async (data: FormFields): Promise<boolean> => {
    const response: AxiosResponse<string> = await axiosInstance().post(
      `${BASE_URL}/login`,
      data,
      {
        withCredentials: true,
      }
    );
    if (response.data === "OK") {
      const name = data.name;
      createSession(name);
      return true;
    }
    return false;
  },
  logout: async (): Promise<boolean> => {
    const response: AxiosResponse<string> = await axiosInstance().post(
      `${BASE_URL}/logout`,
      {
        withCredentials: true,
      }
    );
    if (response.data === "OK") {
      deleteSession();
      return true;
    }
    return false;
  },
};
