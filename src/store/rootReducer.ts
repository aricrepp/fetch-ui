import { combineReducers } from "redux";
import authReducer from "./authStore/reducer";
import dogReducer from "./dogStore/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  dog: dogReducer,
});

export default rootReducer;
