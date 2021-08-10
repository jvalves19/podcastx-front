import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

//Material UI
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; 
import EditDetails from './EditDetails';

//Icones
import CalendarToday from '@material-ui/icons/CalendarToday';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import LinkIcon from '@material-ui/icons/Link';

//Styles (estilo retirado do site: https://pastebin.com/1mUGTNsh)
const styles = (theme) => ({
  paper: {
    padding: '40px 0 60px 20px'
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '100%',
        left: '80%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  button: {
      paddingLeft: 10,
      position: 'absolute',
  }
});

class Profile extends Component {
  changeImage = (event) => {
    const image = event.target.files[0];
    //envia a imagem ao servidor

    const formData = new FormData();
    formData.append('image', image, image.name);

    this.props.uploadImage(formData);
  };
  editImage = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  render() {   
    const { 
      classes,
      user : { 
        credentials: {
          handle, imageUrl, bio, website, createdAt
        },
        loading,
        authenticated
      } 
    } = this.props;

    let currentUser = !loading ? (authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className='profile-image'>
            <img src={imageUrl} alt='Perfil' className='profile-image' />
            <input type='file' id='imageInput' hidden='hidden' onChange={this.changeImage} />
            <Tooltip title='Alterar Imagem' placement='top'>
              <IconButton onClick={this.editImage} className={classes.button}>
                <AddAPhotoIcon color='primary' />
              </IconButton>
            </Tooltip>
          </div>
          <hr />

          <div className='profile-detals'>
            <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>
              @{handle}
            </MuiLink>
            <hr />

            {bio && <Typography variant='h5'> {bio} </Typography>}
            <hr />

            {website && (
              <Fragment>
                <LinkIcon color='primary' />
                <a href={website} target='_blank' rel='noopener noreferrer'>
                  {' '}{website}
                </a>           
              </Fragment>
            )}
            <hr />

            <CalendarToday color='primary'/> {' '}
            <span>
              Membro desde: {dayjs(createdAt).format('MMM YYYY')}
            </span>                 
          </div>
          
          <hr /> 
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}> 
        <Typography variant='body2' align='center'> 
          Perfil não encontrado, faça o login novamente
        </Typography>
      </Paper>
    )) : (<p> Carregando... </p>)

    return currentUser;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))