import React from "react";
import { Route, Switch } from "react-router";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignupPage";
import SignUpPage from "../pages/SigninPage";

const AppRouter = () => {
  return (
    <div>
      <Switch>
        <Route to="/" exact component={SignInPage} />
        <Route to="/home" exact component={HomePage} />
        <Route to="/signup" exact component={SignUpPage} />
      </Switch>
    </div>
  );
};

export default AppRouter;
