import axios from "axios";

import {
  ROOT,
  NEW_CAREER,
  REQUEST_CAREER,
  RECEIVE_CAREER,
  UPDATE_CAREER,
  DELETE_CAREER
} from "./types";

export const fetchCareer = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_CAREER });
    const res = await axios.get(`${ROOT}career/list`);
    dispatch({ type: RECEIVE_CAREER, payload: res.data });
  } catch (e) {
    console.log(e);
    dispatch({ type: RECEIVE_CAREER, payload: [] });
  }
};

export const addNewCareer = career => dispatch => {
  dispatch({ type: NEW_CAREER, payload: career });
};

export const updateCareer = career => dispatch => {
  dispatch({ type: UPDATE_CAREER, payload: career });
};

export const deleteCareer = career => dispatch => {
  dispatch({ type: DELETE_CAREER, payload: career });
};
