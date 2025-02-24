import { authService } from "@/utils/service";
import { Dispatch } from "redux";
import { set } from "./reducer";
import { FormFields } from "@/app/login/_components/form/schema";

export const dispatchActionAuthLogin = async (
  dispatch: Dispatch,
  data: FormFields
) => {
  try {
    const payload = await authService.login(data);
    if (!payload) throw new Error("Failed to fetch auth");

    dispatch(set(payload));

    return payload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error;
  }
};

export const dispatchActionAuthLogout = async (dispatch: Dispatch) => {
  try {
    const payload = await authService.logout();
    if (!payload) throw new Error("Failed to fetch auth");

    dispatch(set(payload));

    return payload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error;
  }
};
