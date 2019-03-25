import {
  NEW_CAREER,
  REQUEST_CAREER,
  RECEIVE_CAREER,
  UPDATE_CAREER,
  DELETE_CAREER
} from "../actions/types";
const INITIAL_STATE = {
  careerItems: [],
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CAREER: {
      return { ...state, isFetching: true };
    }
    case RECEIVE_CAREER: {
      return { ...state, isFetching: false, careerItems: action.payload };
    }
    case NEW_CAREER: {
      return {
        ...state,
        careerItems: [action.payload, ...state.careerItems]
      };
    }
    case UPDATE_CAREER: {
      const careers = state.careerItems.map(item =>
        item._id === action.payload._id ? action.payload : item
      );
      return {
        ...state,
        careerItems: careers
      };
    }
    case DELETE_CAREER: {
      const careerItems = state.careerItems.filter(
        item => item._id !== action.payload._id
      );
      return { ...state, careerItems: careerItems };
    }
    default:
      return state;
  }
};
