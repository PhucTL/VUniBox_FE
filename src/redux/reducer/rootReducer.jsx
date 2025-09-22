import { combineReducers } from "redux";
import authReducer from "./auth";
import docReducer from "../reducer/document/documentReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  doc: docReducer,
});

export default rootReducer;
