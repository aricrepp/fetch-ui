import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "@/types";

const INITIAL_STATE: Auth = {
  session: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    set: (state, actions) => {
      state.session = actions.payload;
    },
  },
});

export const { set } = authSlice.actions;
export default authSlice.reducer;
