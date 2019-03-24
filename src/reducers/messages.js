import {
  NEW_MESSAGE,
  REQUEST_MESSAGE,
  RECEIVE_MESSAGE,
  DELETE_MESSAGE
} from "../actions/types";
const INITIAL_STATE = {
  messageItems: [],
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_MESSAGE: {
      return { ...state, isFetching: true };
    }
    case RECEIVE_MESSAGE: {
      return { ...state, isFetching: false, messageItems: action.payload };
    }
    case NEW_MESSAGE: {
      return {
        ...state,
        messageItems: [action.payload, ...state.messageItems]
      };
    }
    case DELETE_MESSAGE: {
      const messageItems = state.messageItems.filter(
        item => item._id !== action.payload._id
      );
      return { ...state, messageItems: messageItems };
    }
    default:
      return state;
  }
};
