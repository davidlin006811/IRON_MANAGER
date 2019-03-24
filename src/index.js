import React from "react";
import { render } from "react-dom";
import Router from "./router";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/main.css";

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.querySelector("#app")
);
