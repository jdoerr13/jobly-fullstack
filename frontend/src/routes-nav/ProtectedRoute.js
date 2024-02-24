// ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../auth/UserContext'; // Adjust the import path as needed

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

