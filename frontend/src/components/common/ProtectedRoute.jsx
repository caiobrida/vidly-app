import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/AuthService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={propsDefault => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: propsDefault.location }
              }}
            />
          );
        return Component ? (
          <Component {...propsDefault} />
        ) : (
          render(propsDefault)
        );
      }}
    />
  );
};

export default ProtectedRoute;
