import React, { Component } from 'react'
import PropTypes from 'prop-types';
import "../css/formularioSL.css";
import themeFile from '../util/theme';
//import { FaFacebook } from 'react-icons/fa';
//import { FcGoogle } from 'react-icons/fc';

//Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

//Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (themeFile);
class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
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
        this.setState({
            loading: true
        });

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData, this.props.history);
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
                        Cadastre-se
                    </h4>
                    <div className="inputs">
                        <TextField 
                            variant="outlined"
                            id='handle' 
                            name='handle' 
                            type='text' 
                            label='Usuário'
                            className={classes.textField}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField 
                            variant="outlined"
                            id='email' 
                            name='email' 
                            type='email' 
                            label='E-mail' 
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
                        <TextField 
                            variant="outlined"
                            id='confirmPassword' 
                            name='confirmPassword' 
                            type='password' 
                            label='Confirme a Senha' 
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <button type='submit' className="BSubmit" disabled={loading}>
                            Cadastre-se
                            {loading && (
                                <CircularProgress size={40} className={classes.progress} />
                            )}
                        </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})


export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));