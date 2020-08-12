import axios from "axios";
import {
  REGISTER_SUCC,
  REGISTER_ERR,
  USER_LOADED_SUCC,
  USER_LOADED_ERR,
  LOGIN_ERR,
  LOGIN_SUCC,
  LOGOUT,
  CLEAR_PROFILE,
} from "./const";
import { setAlert } from "./alert";
import { setAuthToken } from "../utills/setAuthToken";

//action for loading a user - making sure that a user is signed in by the JWT
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    //sending a request to get the data on the current logged in user, remember we are setting the token in the headers using the utillity funciton.
    const response = await axios.get("/api/auth");
    dispatch({ type: USER_LOADED_SUCC, payload: response.data });
  } catch (error) {
    //if user is not logged in, no token is provided so the server request will be denied and throw and error.
    dispatch({ type: USER_LOADED_ERR });
  }
};

//action for registering user

export const register = (name, email, password) => async (dispatch) => {
  //configuration for the headers so the request will work
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // converting the payload of the request to a string with json format.
  const data = JSON.stringify({ name, email, password });
  try {
    const response = await axios.post("/api/users/", data, config);
    //success:
    dispatch({ type: REGISTER_SUCC, payload: response.data });
    //getting the user info
    dispatch(loadUser());
  } catch (error) {
    //Request to server failed. we also set alerts with our Alert component through setAlert action
    const errors = error.response.data.errors;
    if (errors) {
      //looping through the errors array that we get frm the server and showing them in the UI
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({ type: REGISTER_ERR });
  }
};

//login an existing user
export const login = (email, password) => async (dispatch) => {
  //configuration for the headers so the request will work
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // converting the payload of the request to a string with json format.
  const data = JSON.stringify({ email, password });
  try {
    const response = await axios.post("/api/auth/", data, config);
    //success:
    dispatch({ type: LOGIN_SUCC, payload: response.data });
    //getting the user info

    dispatch(loadUser());
  } catch (error) {
    //Request to server failed. we also set alerts with our Alert component through setAlert action
    const errors = error.response.data.errors;
    if (errors) {
      //looping through the errors array that we get frm the server and showing them in the UI
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({ type: LOGIN_ERR });
  }
};

//logout action
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
