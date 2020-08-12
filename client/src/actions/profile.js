import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  GET_PROFILE_ERR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_ALL_PROFILES,
  GET_REPOS,
} from "./const";

//getting user profile

export const getUserProfile = () => async (dispatch) => {
  try {
    const response = await axios.get("api/profile/me");
    dispatch({ type: GET_PROFILE, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_ERR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};

//get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const response = await axios.get("/api/profile");
    dispatch({ type: GET_ALL_PROFILES, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_ERR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};

//get specific profile by the id of the USER.
export const getProfById = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/profile/user/${userId}`);
    dispatch({ type: GET_PROFILE, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_ERR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};
//get GITHUB repos if user has them
export const getGit = (user) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/profile/github/${user}`);
    dispatch({ type: GET_REPOS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_ERR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};

// creating /updating profile

export const createProfile = (data, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post("/api/profile", data, config);
    //the response is the new profile
    dispatch({ type: GET_PROFILE, payload: response.data });
    dispatch(setAlert(edit ? "Profile updated" : "Profile created", "success"));
    //redirecting the user to dashboard only if its a new profile, not an update
    if (!edit) history.push("/dashboard");
  } catch (error) {
    //Request to server failed. we also set alerts with our Alert component through setAlert action
    const errors = error.response.data.errors;

    if (errors) {
      //looping through the errors array that we get frm the server and showing them in the UI
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: GET_PROFILE_ERR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};
//adding experience or education to existing profile
export const addExperienceOrEducation = (data, history, endpoint) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.put(`/api/profile/${endpoint}`, data, config);

    dispatch({ type: UPDATE_PROFILE, payload: response.data });
    dispatch(setAlert("Added successfuly", "success"));
    history.push("/dashboard");
  } catch (error) {
    //Request to server failed. we also set alerts with our Alert component through setAlert action
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: GET_PROFILE_ERR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// delete experience or education
export const deleteExperienceOrEducation = (id, endpoint) => async (
  dispatch
) => {
  try {
    const resp = await axios.delete(`/api/profile/${endpoint}/${id}`);
    dispatch({ type: UPDATE_PROFILE, payload: resp.data });
    dispatch(setAlert(`${endpoint} removed successfuly!`, "success"));
  } catch (error) {
    dispatch({
      type: GET_PROFILE_ERR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete?")) {
    try {
      const resp = await axios.delete("/api/profile");
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert("The account has been deleted"));
    } catch (error) {
      dispatch({
        type: GET_PROFILE_ERR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
