import {
  NEW_REVIEW,
  REQUEST_REVIEW,
  RECEIVE_REVIEW,
  DELETE_REVIEW
} from "../actions/types";
const INITIAL_STATE = {
  reviewItems: [],
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_REVIEW: {
      return { ...state, isFetching: true };
    }
    case RECEIVE_REVIEW: {
      return { ...state, isFetching: false, reviewItems: action.payload };
    }
    case NEW_REVIEW: {
      return {
        ...state,
        reviewItems: [action.payload, ...state.reviewItems]
      };
    }
    case DELETE_REVIEW: {
      const reviewItems = state.reviewItems.filter(
        item => item._id !== action.payload._id
      );
      return { ...state, reviewItems: reviewItems };
    }
    default:
      return state;
  }
};
