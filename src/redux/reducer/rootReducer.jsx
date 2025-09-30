import { combineReducers } from "redux";
import authReducer from "./auth";
import docReducer from "../reducer/document/documentReducer";
import citationReducer from "../reducer/citation/citationReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  doc: docReducer,
  citaiton: citationReducer,
});

export default rootReducer;
