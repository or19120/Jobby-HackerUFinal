import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// this component checks if a user has access to the page. we don't want everyone to be able to access.
const PrivateRoute = ({ component: C, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      // using render to pass props to the component
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <C {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
