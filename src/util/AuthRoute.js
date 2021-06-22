import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = (props) => {
  // ? e : significam IfElse (if true (?) então <Redirect> Senão(:) <Component>)
  const authenticated = !!localStorage.getItem('FBIdToken');

  return (authenticated) ? <Redirect to='/' /> : <Route {...props} />
};

export default AuthRoute;