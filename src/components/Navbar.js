import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../css/menu.css';

//Material-Ui
import Button from '@material-ui/core/Button';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const Botao = styled.button`
    &:hover{
        background-color: var(--fifith-color-xlight);
        transition: all ease 0.5s;
        color: var(--fourth-color-xdark);
        border-color: var(--fourth-color-xdark);
    }
`;

const Cadastro = styled.button`
    &:hover{
        background-color: var(--fifith-color-xlight );
        transition: all ease 0.5s;
        color: var(--fourth-color-xdark);
        border-color: var(--fourth-color-xdark);
    }
`;

const linkStyle = {
    textDecoration: "none",
    width: "12%",
    height:"inherit"
};

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
        localStorage.removeItem('FBIdToken');
        this.setState({
            authenticated: false
        })
    }
    render() {
        const { authenticated } = this.state;

        return (
            <nav className="container">
                { authenticated ?                     
                    <div className='navBar'>
                        <Link to="/" style={linkStyle}> 
                        <Botao className="botoes">Início</Botao> 
                        </Link>
                        <Link to="/profile" style={linkStyle}> 
                        <Botao className="botoes">Perfil</Botao> 
                        </Link>                        
                        <Link to="/podcast" style={linkStyle}> 
                            <Botao className="botoes">Podcastizar</Botao>
                        </Link>
                        <Tooltip title='Notificações' placement='top'>
                            <IconButton onClick={this.seeNotification} color='default' >
                                <NotificationsIcon></NotificationsIcon>
                            </IconButton>
                        </Tooltip>
                        <Button color='secondary'component={Link} to="/login" onClick={this.Logout}> Sair </Button>
                    </div>
                        : 
                    <div className='navBar'>
                        <Link to="/" style={linkStyle}> 
                            <Botao className="botoes">Início</Botao> 
                        </Link>
                        <Link to="/login" style={linkStyle}> 
                            <Botao className="botoes">Login</Botao> 
                        </Link>
                        <Link to="/signup" style={linkStyle}> 
                            <Cadastro className="Signup" component={Link} to="/">Cadastrar</Cadastro>
                        </Link> 
                    </div>                    
                }                
            </nav>
        )
    }
}

export default Navbar;