import { combineReducers } from "redux";
import authReducer from "./auth";
import docReducer from "../reducer/document/documentReducer";
import citationReducer from "../reducer/citation/citationReducer";
import userReducer from "../reducer/user/userReducer";
import planReducer from "../reducer/plan/planReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  doc: docReducer,
  citaiton: citationReducer,
  user: userReducer,
  plan: planReducer,
});

export default rootReducer;
