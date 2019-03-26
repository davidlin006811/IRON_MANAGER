import { REQUEST_THEME, RECEIVE_THEME, NEW_THEME } from "../actions/types";
const INITIAL_STATE = {
  themeSetting: {},
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_THEME: {
      return { ...state, isFetching: true };
    }
    case RECEIVE_THEME: {
      return { ...state, themeSetting: action.payload, isFetching: false };
    }
    case NEW_THEME: {
      let themeSetting = state.themeSetting;
      themeSetting.presets.push(action.payload);
      return {
        ...state,
        themeSetting: themeSetting
      };
    }
    default:
      return state;
  }
};
