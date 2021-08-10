import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

AuthRoute.propTypes = {
  user: PropTypes.object
}

export default connect(mapStateToProps)(AuthRoute);