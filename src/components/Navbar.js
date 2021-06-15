import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        return (
            <AppBar position="fixed" >
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/"> Ínicio </Button>
                    <Button color="inherit" component={Link} to="/login"> Login </Button>
                    <Button color="inherit" component={Link} to="/signup"> Cadastro </Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;