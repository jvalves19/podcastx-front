import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './paleta.css';
import './App.css';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

//Redux
import store from './redux/store';
import { Provider } from 'react-redux';
import { SET_AUTHENTICATED } from './redux/types'; 
import { logoutUser, getUserData } from './redux/actions/userActions';

//Material-UI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
import PrivateRoute from './util/PrivateRoute';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import podcast from './pages/podcast';
import profile from './pages/profile';
import user from './pages/user';

const theme = createMuiTheme(themeFile);

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
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div className='container'>
              <Navbar />
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute exact path='/login' component={login} />
                <AuthRoute exact path='/signup' component={signup} />
                <PrivateRoute exact path='/podcast' component={podcast} />
                <PrivateRoute exact path='/profile' component={profile} />
                <Route exact path='/users/:handle' component={user} />
              </Switch>
            </div>
          </Router>          
        </Provider>        
      </MuiThemeProvider>
    );
  }
}

export default App;