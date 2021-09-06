import React, { Component } from 'react'
import PropTypes from 'prop-types';
import "../css/formularioSL.css";
import themeFile from '../util/theme';
//import { FaFacebook } from 'react-icons/fa';
//import { FcGoogle } from 'react-icons/fc';

//Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

//Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (themeFile);
class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){            
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;

        return (
            <div className="page">                
                <form className="formulario" noValidate onSubmit={this.handleSubmit}>
                    <fieldset className="campoForm">
                        <h4 className="legenda"> 
                            Para continuar faça seu Login
                        </h4>
                        <div className="inputs">
                        <TextField 
                            variant="outlined"
                            id='email' 
                            name='email' 
                            type='email' 
                            label='Enderço de E-mail' 
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField 
                            variant="outlined"
                            id='password' 
                            name='password' 
                            type='password' 
                            label='Senha' 
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <button type='submit' className="BSubmit" disabled={loading}>
                            Login
                            {loading && (
                                <CircularProgress size={40} className={classes.progress} />
                            )}
                        </button>
                        </div>

                    <div className="divisor"> <strong>ou</strong> </div> 
                                                
                    <div className="botoesL">
                        <h4>Não é um caçador de Podcasts ainda? <br /></h4>
                        <h4>Faça seu cadastro</h4>
                        <a href="/signup" style={{textDecoration:'none'}}>Cadastro</a>
                    </div>

                    </fieldset>
                </form>
            </div>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,   
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
})
const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));