import axios from "axios";
import { ROOT, REQUEST_THEME, RECEIVE_THEME, NEW_THEME } from "./types";

export const fetchTheme = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_THEME });
    const res = await axios.get(`${ROOT}theme/all`);
    dispatch({ type: RECEIVE_THEME, payload: res.data });
  } catch (e) {
    console.log(e);
    dispatch({ type: RECEIVE_THEME, payload: [] });
  }
};
export const newTheme = theme => dispatch => {
  dispatch({ type: NEW_THEME, payload: theme });
};
