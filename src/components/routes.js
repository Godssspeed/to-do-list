import React from "react";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import ListDetails from "./ListDetails";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

export default (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path={`lists/1`} component={ListDetails} />
  </Switch>
);
