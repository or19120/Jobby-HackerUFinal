import { SET_ALERT, REMOVE_ALERT } from "./const";
import uuid from "uuid";

export const setAlert = (message, alertType) => (dispatch) => {
  //generating random id:
  const id = uuid.v4();
  dispatch({ type: SET_ALERT, payload: { message, alertType, id } });
  //setting timeout for the alert
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, 4000);
};
