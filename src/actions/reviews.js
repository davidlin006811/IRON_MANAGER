import axios from "axios";
import {
  ROOT,
  REQUEST_REVIEW,
  RECEIVE_REVIEW,
  NEW_REVIEW,
  DELETE_REVIEW
} from "./types";

export const fetchReview = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_REVIEW });
    const res = await axios.get(`${ROOT}review/all`);
    dispatch({ type: RECEIVE_REVIEW, payload: res.data });
  } catch (e) {
    console.log(e);
    dispatch({ type: RECEIVE_REVIEW, payload: [] });
  }
};

export const addNewReview = review => dispatch => {
  dispatch({ type: NEW_REVIEW, payload: review });
};

export const deleteReview = review => dispatch => {
  dispatch({ type: DELETE_REVIEW, payload: review });
};
