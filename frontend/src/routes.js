import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Movies from "./components/Movies";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import LogOut from "./components/LogOut";
import ProtectedRoute from "./components/common/ProtectedRoute";

const Routes = props => {
  return (
    <Switch>
      <Route path="/register" component={RegisterForm} />
      <Route path="/login" component={LoginForm} />
      <Route path="/logout" component={LogOut} />
      <ProtectedRoute path="/movies/:id" component={MovieForm} />
      <Route
        path="/movies"
        render={propsDefault => <Movies {...propsDefault} user={props.users} />}
      />
      <Route path="/customers" component={Customers} />
      <Route path="/rentals" component={Rentals} />
      <Route path="/not-found" component={NotFound} />
      <Redirect exact from="/" to="/movies" />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
