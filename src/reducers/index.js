import { combineReducers } from "redux";
import Auth from "./auth";
import Products from "./products";
export default combineReducers({
  auth: Auth,
  products: Products
});
