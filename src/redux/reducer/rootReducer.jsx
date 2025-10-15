import { combineReducers } from "redux";
import authReducer from "./auth";
import docReducer from "../reducer/document/documentReducer";
import citationReducer from "../reducer/citation/citationReducer";
import userReducer from "../reducer/user/userReducer";
import planReducer from "../reducer/plan/planReducer";
import chatbotReducer from "../slices/chatbotSlice";
import adminDashboardReducer from "../reducer/admin/adminDashboardReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  doc: docReducer,
  citaiton: citationReducer,
  user: userReducer,
  plan: planReducer,
  chatbot: chatbotReducer,
  adminDashboard: adminDashboardReducer,
});

export default rootReducer;
