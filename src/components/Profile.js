import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

//Material UI
import Paper from '@material-ui/core/Paper';
import MULink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; 

//Icones
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';

//Styles (estilo retirado do site: https://pastebin.com/1mUGTNsh)
const styles = (theme) => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
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
      marginTop: '130px',
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
          handle, imageUrl, bio, website, location, createdAt
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
                <EditIcon color='primary' />
              </IconButton>
            </Tooltip>
          </div>
          <hr />
          <div className='profile-detals'>
            <MULink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>
              @{handle}
            </MULink>
            <hr />
            {bio && <Typography variant='body2'> {bio} </Typography>}
            <hr />
            <CalendarToday color='primary'/> {' '}
            <span>
              Membro desde: {dayjs(createdAt).format('MMM YYYY')}
            </span>
            
          </div>
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
