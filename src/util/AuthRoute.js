import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = (props) => {
  // ? e : significam IfElse (if true (?) então <Redirect> Senão(:) <Component>)
  const authenticated = !!localStorage.getItem('FBIdToken');

  if (authenticated) {
    return <Redirect to='/' />
  }
  else {
    return <Route {...props} />
  }
  
};

export default AuthRoute;