import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import themeFile from './util/theme';
import './App.css';
import jwtDecode from 'jwt-decode';

//Material-UI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import podcast from './pages/podcast';

const theme = createMuiTheme(themeFile);

//Sistema Básico de Autenticação/Manter Autenticado
let authenticated;

const token = localStorage.FBIdToken;
if (token){
  const decodedToken = jwtDecode(token);

  //Se passar de um determinado tempo, token expira e retorna a página inicial
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className='App'>
          <Router>
            <div className='container'>
              <Navbar />
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute exact path='/login' component={login} authenticated={authenticated} />
                <AuthRoute exact path='/signup' component={signup} authenticated={authenticated} />
                <AuthRoute exact path='/podcast' component={podcast} authenticated={authenticated} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;