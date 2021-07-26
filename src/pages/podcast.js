import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import themeFile from '../util/theme';

//Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (themeFile);

class podcast extends Component { 
  constructor(){
    super();
    this.state = {
        podcastUrl: '',
        podcastName: '',
        loading: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
        loading: true
    });

    const newPodcastData = {
        podcastUrl: this.state.podcastUrl,
        podcastName: this.state.podcastName
    };
    axios
        .post('/podcast', newPodcastData)
        .then((res) => {
            //Mantém o usuário logado mesmo após recarregar a página, através do Id (Token)
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);

            this.setState({
                loading: false
            });
            this.props.history.push('/');
        })
        .catch((err) => {
            this.setState({
                loading: false
            });
        });
  };

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { loading } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm > 
          <Typography variant='h4' className={classes.pageTitle}>
              Publique seu Podex
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
              <TextField 
                id='podcastUrl'
                name='podcastUrl'
                type='text'
                label='Url do Podcast'
                className={classes.TextField}
                value={this.state.handle}
                onChange={this.handleChange}
                fullWidth
              />

              <TextField 
                id='podcastName'
                name='podcastName'
                type='text'
                label='Nome do Podcast'
                className={classes.TextField}
                value={this.state.handle}
                onChange={this.handleChange}
                fullWidth
              />
              
              <input 
                type='file' 
                id='audioInput' 
                hidden='hidden'
                onChange={this.handleAudioChange}
              />
              <Tooltip title='Insera Aqui seu Podex' placement='top'>
                <IconButton onClick={this.handleEditAudio} className='button'>
                  <AudiotrackIcon color='primary' />
                </IconButton>
              </Tooltip>
              
              <Button type='submit' variant='outlined' color='primary' className={classes.button} disabled={loading}>
                  Publicar
                  {loading && (
                      <CircularProgress size={30} className={classes.progress} />
                  )}
              </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

podcast.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(podcast);