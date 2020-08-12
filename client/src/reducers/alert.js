import { SET_ALERT, REMOVE_ALERT } from "../actions/const";

const initialState = [];
//reducer for the alert component
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    //in case we need to remove one specific alert:
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
