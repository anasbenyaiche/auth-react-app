import { combineReducers } from "redux";
import authentication from "./authentificationReducer";

const rootReducer = combineReducers({ authentication });

export default rootReducer;
