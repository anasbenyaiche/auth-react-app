import axios from "axios";
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

const signUpRequest = () => ({
  type: SIGN_UP_REQUEST,
});

const signUpSuccess = (user) => ({
  type: SIGN_UP_SUCCESS,
  payload: {
    user,
  },
});
const signUpFailure = (error) => ({
  type: SIGN_UP_FAILURE,
  payload: error,
});

export const signUp = (user) => async (dispatch) => {
  // dispatching the start of action sign in
  dispatch(signUpRequest());
  try {
    const res = await axios.post("http://localhost:8000/users/singup", user);
    dispatch(signUpSuccess(res.data.user));
  } catch (err) {
    dispatch(signUpFailure(err));
  }
};

//Sign in action creators
const signInRequest = () => ({
  type: SIGN_IN_REQUEST,
});
const signInSuccess = (token) => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    token,
  },
});
const signInFailure = (error) => ({
  type: SIGN_IN_FAILURE,
  payload: error,
});

export const signIn = (payload, history) => (dispatch) => {
  dispatch(signInRequest);
  try {
    const res = axios.post("http://localhost:8000/users/singup", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
    });
    dispatch(signInSuccess(res.data.token));
    history("/home");
  } catch (error) {
    dispatch(signInFailure);
  }
};
//sign out action creators
export const signOutRequest = () => ({
  type: SIGN_OUT_REQUEST,
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});

export const signOutFailure = () => ({
  type: SIGN_OUT_FAILURE,
});

export const signOut = function (history) {
  return function (dispatch) {
    dispatch(signOutRequest());
    localStorage.clear();
    history.push("/signin");
    if (localStorage.getItem("USER_TOKEN")) {
      dispatch(signOutFailure());
    } else {
      dispatch(signOutSuccess());
    }
  };
};
