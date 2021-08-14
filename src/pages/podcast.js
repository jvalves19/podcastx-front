import React, { Component } from 'react'
import PropTypes from 'prop-types';
import themeFile from '../util/theme';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import { connect } from 'react-redux';
import { postPodcast } from '../redux/actions/dataActions';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import Grid from '@material-ui/core/Grid';

import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (themeFile);

class podcast extends Component { 
  constructor(){
    super();
    this.state = {
      podcastUrl: '',
      podcastName: '',
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({ errors: nextProps.UI.errors })
    }
  }
  
  handleSubmit = (event) => {
    event.preventDefault();

    const newPodcast = {
      podcastUrl: this.state.podcastUrl,
      podcastName: this.state.podcastName
    };
    console.log(newPodcast);
    this.props.postPodcast(newPodcast, this.props.history);
  };
  handleChange = (event) => {
    this.setState({ 
      [event.target.name]: event.target.value 
    })
  }

  render() {
    const { classes, UI: { loading }} = this.props;
    const { errors } = this.state;

    return (
      <Grid>
        <DialogTitle> Publique aqui o seu PODEX </DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
            <TextField 
              id='podcastUrl'
              name='podcastUrl'
              type='text'
              label='Podex'
              placeholder='Link do PODCAST'
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              onChange={this.handleChange}
              fullWidth 
            />
            <TextField 
              id='podcastName'
              name='podcastName'
              type='text'
              label='Nome do Podex'
              placeholder='Nome do PODCAST'
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              onChange={this.handleChange}
              fullWidth 
            />                 
            <Button 
              type='submit' 
              variant='outlined' 
              color='primary' 
              className={classes.button} 
              disabled={loading} 
            >
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                  {errors.general}
              </Typography>
            )}
              <Tooltip title='Insira seu Podcast Aqui' placement='top'>
                <AudiotrackIcon />
              </Tooltip> 
              Podcastizar
              {loading && ( <CircularProgress size={30} className={classes.progress} />)}
            </Button>
          </form>
        </DialogContent>
      </Grid>
    )
  }
}

podcast.propTypes = {
  UI: PropTypes.object.isRequired,
  postPodcast: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI
})

export default connect(mapStateToProps, { postPodcast })(withStyles(styles)(podcast));