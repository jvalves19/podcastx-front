import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, authenticated, ...rest}) => (
  // ? e : significam IfElse (if true (?) então <Redirect> Senão(:) <Component>)
  <Route
    {...rest}
    render = { (props) => 
      authenticated === true ? <Redirect to='/' /> : <Component {...props}/> 
    }
  />
);

export default AuthRoute;