import { combineReducers } from "redux";
import Auth from "./auth";
import Products from "./products";
import Messages from "./messages";
import Reviews from "./reviews";
import Careers from "./careers";
import Theme from "./theme";
export default combineReducers({
  auth: Auth,
  products: Products,
  messages: Messages,
  reviews: Reviews,
  careers: Careers,
  theme: Theme
});
