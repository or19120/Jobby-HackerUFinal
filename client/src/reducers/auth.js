import {
  REGISTER_ERR,
  REGISTER_SUCC,
  USER_LOADED_SUCC,
  USER_LOADED_ERR,
  LOGIN_SUCC,
  LOGIN_ERR,
  LOGOUT,
  ACCOUNT_DELETED,
} from "../actions/const";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    //both are doing the same:
    case REGISTER_SUCC:
    case LOGIN_SUCC:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case USER_LOADED_ERR:
    case LOGIN_ERR:
    case REGISTER_ERR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };
    case USER_LOADED_SUCC:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    default:
      return state;
  }
}
