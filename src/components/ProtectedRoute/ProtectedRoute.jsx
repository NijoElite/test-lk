import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authContext } from '../../contexts/auth';

export const isLoggedIn = auth => {
  return auth.user;
};

export const isNotLoggedIn = auth => {
  return !auth.user;
};

const ProtectedRoute = ({ fallback = '/', fallbackPredicate = isNotLoggedIn, ...restProps }) => {
  const authState = useContext(authContext);

  return fallbackPredicate(authState) ? <Redirect to={fallback}/> : <Route {...restProps}/>;
};

export default ProtectedRoute;
