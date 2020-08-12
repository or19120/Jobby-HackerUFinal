import {
  GET_PROFILE,
  GET_PROFILE_ERR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_ALL_PROFILES,
  GET_REPOS,
} from "../actions/const";

const initialState = {
  info: null,
  allProfiles: [],
  repos: [],
  loading: true,
  errors: {},
};
export const profile = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, info: action.payload, loading: false };
    case GET_ALL_PROFILES:
      return { ...state, allProfiles: action.payload, loading: false };
    case GET_REPOS:
      return { ...state, repos: action.payload, loading: false };
    case GET_PROFILE_ERR:
      return {
        ...state,
        errors: action.payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return { ...state, info: null, repos: [], loading: false };
    default:
      return state;
  }
};
