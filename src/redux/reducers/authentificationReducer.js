import { isValidToken } from "../../utils/isValidToken";
import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "../actionTypes/authTypes";

const INITITAL_STATE = {
  currentUser: localStorage.getItem("USER-TOKEN")
    ? isValidToken(localStorage.getItem("USER-TOKEN"))
    : null,
  token: localStorage.getItem("USER-TOKEN")
    ? localStorage.getItem("USER-TOKEN")
    : null,
  error: "",
  loading: false,
  isAuthenticated: false,
};

const authenticationReducer = (state = INITITAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST:
    case SIGN_OUT_REQUEST:
      return { ...state, loading: true, isAuthenticated: false };

    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        currentUser: action.payload.user,
        isAuthenticated: true,
      };

    case SIGN_IN_FAILURE:
    case SIGN_UP_FAILURE:
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        currentUser: null,
        isAuthenticated: false,
      };
    case SIGN_OUT_SUCCESS:
      localStorage.removeItem("USER-TOKEN");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        token: null,
      };
    default:
      return state;
  }
};
export default authenticationReducer;
