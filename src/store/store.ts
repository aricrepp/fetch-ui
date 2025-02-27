import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authAPI, dogAPI } from "@/utils/service/rtkQuery";
import dogReducer from "./dogStore/reducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // auth: authReducer,
      dog: dogReducer,
      [dogAPI.reducerPath]: dogAPI.reducer,
      [authAPI.reducerPath]: authAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([dogAPI.middleware, authAPI.middleware]),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

setupListeners(makeStore);
