import axios from "axios";

import {
  ROOT,
  NEW_MESSAGE,
  REQUEST_MESSAGE,
  RECEIVE_MESSAGE,
  DELETE_MESSAGE
} from "./types";

export const fetchMessage = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_MESSAGE });
    const res = await axios.get(`${ROOT}message/all`);
    dispatch({ type: RECEIVE_MESSAGE, payload: res.data });
  } catch (e) {
    console.log(e);
    dispatch({ type: RECEIVE_MESSAGE, payload: [] });
  }
};

export const addNewMessage = message => dispatch => {
  dispatch({ type: NEW_MESSAGE, payload: message });
};

export const deleteMessage = message => dispatch => {
  dispatch({ type: DELETE_MESSAGE, payload: message });
};
