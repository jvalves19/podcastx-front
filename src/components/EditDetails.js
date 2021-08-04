import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import themeFile from '../util/theme';

//Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

//Material-UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const styles = (themeFile);

class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false
  };

  userDetailsState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : '',
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.userDetailsState(this.props.credentials);
  }
  handleClose = () => {
    this.setState({ open: false });
  }

  componentDidMount(){
    const { credentials } = this.props;
    this.userDetailsState(credentials);
  } 

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title='Editar Detalhes' placement='left'>
          <IconButton onClick={this.handleOpen} className={classes.editButton}>
            <EditIcon color='primary' />
            Editar Detalhes
          </IconButton>
        </Tooltip>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
          <DialogTitle> Editar Detalhes </DialogTitle>
          <DialogContent>
            <form>
              <TextField 
                name='bio' 
                type='text' 
                label='Bio' 
                multiline 
                rows='2' 
                placeholder='Conte sobre você' 
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth 
              />

              <TextField 
                name='website' 
                type='text' 
                label='Website' 
                placeholder='Website' 
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth 
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancelar
            </Button>
            <Button onClick={this.handleSubmit} color='primary'>
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));