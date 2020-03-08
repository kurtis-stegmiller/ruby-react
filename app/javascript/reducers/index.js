import { combineReducers } from "redux";

// Reducers
import auth from "./auth";
import table from "./table";
import dashboard from "./dashboard";

export default combineReducers({ auth, table, dashboard });
