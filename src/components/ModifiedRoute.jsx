import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { auth } from 'scenes/Login/authActions';

export default function ModifiedRoute({
  children,
  isPrivate,
  Component,
  ...rest
}) {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isPrivate && !isAuthenticated) {
      dispatch(auth());
    }
  }, []);

  if (isLoading && isPrivate) return null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isPrivate && !isAuthenticated ? (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
