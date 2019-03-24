import { combineReducers } from "redux";
import Auth from "./auth";
import Products from "./products";
import Messages from "./messages";
export default combineReducers({
  auth: Auth,
  products: Products,
  messages: Messages
});
