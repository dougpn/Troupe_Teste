import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

type PrivateRouteProps = {
    path: RouteProps['path'];
    component: React.ElementType;
    exact?: boolean;
  };

const ProtectedRoute: React.FunctionComponent<PrivateRouteProps> = ({
    component: Component,
    exact: boolean,
    ...routeProps
  }) => {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Route
    exact
    {...routeProps}
      render={(props) =>
        isAuthenticated ? <Component /> : <Redirect to="/sign-in" />
      }
    />
  );
}

export default ProtectedRoute;