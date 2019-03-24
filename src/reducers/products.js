import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  NEW_PRODUCT,
  UPDATE_PRODUCT_FINISH,
  DELETE_PRODUCT_FINISH
} from "../actions/types";

const INITIAL_STATE = {
  productItems: [],
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_PRODUCTS: {
      return { ...state, isFetching: true };
    }
    case RECEIVE_PRODUCTS: {
      return { ...state, isFetching: false, productItems: action.payload };
    }
    case NEW_PRODUCT: {
      return {
        ...state,
        isFetching: false,
        productItems: [action.payload, ...state.productItems]
      };
    }

    case UPDATE_PRODUCT_FINISH: {
      let products = state.productItems.map(item =>
        item._id === action.payload._id ? action.payload : item
      );
      return {
        ...state,

        productItems: products
      };
    }

    case DELETE_PRODUCT_FINISH: {
      let products = state.productItems.filter(
        x => x._id !== action.payload._id
      );
      return {
        ...state,
        productItems: products
      };
    }
    default:
      return state;
  }
};
