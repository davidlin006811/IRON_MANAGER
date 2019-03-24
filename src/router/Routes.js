import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/home";
import LoginPage from "../components/login/index";
import requireAuth from "../utils/requireAuth";

/*export default () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/home" component={requireAuth(Home)} />
    </Switch>
  );
};*/

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
};
