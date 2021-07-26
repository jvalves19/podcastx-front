import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {    
    constructor(){
        super();
        this.state = {
            authenticated: false,
        }
        const token = localStorage.FBIdToken;
        if (token){
            this.state = {
                authenticated: true,
            }
        }
    }
    Logout = (event) => {
        alert('Logout');
        localStorage.removeItem('FBIdToken');
        this.setState({
            authenticated: false
        })
    }
    render() {
        const { authenticated} = this.state;

        return (
            <AppBar position="fixed" >

                    { authenticated ?                     
                        <Toolbar className="nav-container">
                            <Button color="inherit" component={Link} to="/"> Ínicio </Button>
                            <Button color="inherit" component={Link} to="/profile"> Perfil </Button>                        
                            <Button color="inherit" component={Link} to="/podcast"> Podcastizar </Button>
                            <Button color='secondary'component={Link} to="/login" onClick={this.Logout}> Sair </Button>
                        </Toolbar>
                            : 
                        <Toolbar className="nav-container">
                            <Button color="inherit" component={Link} to="/"> Ínicio </Button>
                            <Button color="inherit" component={Link} to="/login"> Login </Button>
                            <Button color="inherit" component={Link} to="/signup"> Cadastro </Button> 
                        </Toolbar>                    
                    }
                
            </AppBar>
        )
    }
}

export default Navbar;