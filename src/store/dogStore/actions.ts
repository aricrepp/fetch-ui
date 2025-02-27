import { dogsService } from "@/utils/service";
import { Dispatch } from "redux";
import { setDogBreeds, setDogObjectInfo, setDogMatch } from "./reducer";
import { Dog } from "@/types";

export const dispatchActionGetAllDogs = async (
  dispatch: Dispatch,
  queryParams?: string
): Promise<Dog[] | undefined> => {
  try {
    const payload = await dogsService.getAllDogsWithIDs(dispatch, queryParams);
    // if (!payload) throw new Error("Failed to fetch dog info");

    if (payload) dispatch(setDogObjectInfo(payload));
    return payload;
  } catch (error) {
    throw error;
  }
};

export const dispatchActionGetDogs = async (dispatch: Dispatch) => {
  try {
    const payload = await dogsService.getDogs();
    if (!payload) throw new Error("Failed to fetch dog info");

    dispatch(setDogBreeds(payload));

    return payload;
  } catch (error) {
    throw error;
  }
};

export const dispatchActionGetDogsMatch = async (
  dispatch: Dispatch,
  dog: string[]
) => {
  try {
    const payload = await dogsService.getDogsMatch(dog);
    if (!payload) throw new Error("Failed to fetch dog info");

    dispatch(setDogMatch(payload));
  } catch (err) {
    console.error(err);
  }
};
