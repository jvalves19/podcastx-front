import React, { Component } from 'react'
import './paleta.css';
import './css/App.css';
import './css/paleta2.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

//Redux
import store from './redux/store';
import { Provider } from 'react-redux';
import { SET_AUTHENTICATED } from './redux/types'; 
import { logoutUser, getUserData } from './redux/actions/userActions';

//Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
import PrivateRoute from './util/PrivateRoute';
import Rodape from './components/Rodape';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import podcast from './pages/podcast';
import profile from './pages/profile';
import user from './pages/user';

//Sistema Básico de Autenticação/Manter Autenticado
const token = localStorage.FBIdToken;
if (token){
  const decodedToken = jwtDecode(token);

  //Se passar de um determinado tempo, token expira e retorna a página inicial
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='corpo'>
            <Navbar />
            <Switch>
              <Route exact path='/' component={home} />
              <AuthRoute exact path='/login' component={login} />
              <AuthRoute exact path='/signup' component={signup} />
              <PrivateRoute exact path='/podcast' component={podcast} />
              <PrivateRoute exact path='/profile' component={profile} />
              <Route exact path='/users/:handle' component={user} />
            </Switch>
            <Rodape />
          </div>
        </Router>                    
      </Provider>          
    );
  }
}

export default App;