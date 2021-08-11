import React, { Component } from 'react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';
import { likePodcast, unlikePodcast, getPodcast, deletePodcast } from '../redux/actions/dataActions'; 

//Material-UI
import withStyles from '@material-ui/core/styles/withStyles';

//Cards - MaterialUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import CardMedia from '@material-ui/core/CardMedia';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import DeletePodcast from './DeletePodcast';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 1,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  info: {
    marginLeft: 5,
  },
  btn: {
    marginBottom: 10,
    marginRight: 5
  }  
}
 
class Podcasts extends Component {
  constructor(){
    super();    
    this.state = {
      playing: false,
    };
    this.audio = new Audio(
      'https://firebasestorage.googleapis.com/v0/b/podcastx-tcc.appspot.com/o/Cornerstone.mp3?alt=media'
    )
  }

  soundPlay = () => {
    this.setState({
      playing: true
    })
    //this.props.getPodcast(this.props.podcastId)
    this.audio.play();
  }

  soundStop = () => {
    this.setState({
      playing: false
    });
    this.audio.pause();  
  }

  likedPodcast = () => {
    if(this.props.user.likes && this.props.user.likes.find(like => like.podcastId === this.props.podcast.podcastId)){
      return true;
    }
    else { 
      return false;
    }
  };

  likePodcast = () => {
    this.props.likePodcast(this.props.podcast.podcastId);
  }
  unlikePodcast = () => {
    this.props.unlikePodcast(this.props.podcast.podcastId);
  }
  render() {
    dayjs.extend(relativeTime);

    const { 
      classes, 
      podcast : { 
        podcastId, podcastUrl, podcastName, createdAt, userImage, userHandle, likeCount
      }, 
      user: { 
        authenticated, 
        credentials: { handle }
      },
    } = this.props;
    const { playing } = this.state;

    const deleteButton = authenticated && userHandle === handle ? (
      <DeletePodcast podcastId={podcastId} />
    ) : null

    return (
      <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {podcastName}
          </Typography>
          <Typography variant="subtitle1" component={Link} to={`/users/${userHandle}`} color="textSecondary">
            @{userHandle}
          </Typography>

          { deleteButton }
          
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="previous">
            {'spacing{1}' === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>

            { playing ? 
              <IconButton aria-label="play/pause" onClick={() => this.soundStop()}>
                <PauseIcon />
              </IconButton> 
                : 
              <IconButton aria-label="play/pause" onClick={() => this.soundPlay()}>
                <PlayArrowIcon />
              </IconButton> 
            }  

          <IconButton aria-label="next">
            {'spacing{1}' === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
          
        </div>
        
        <Typography variant="subtitle1" color="textSecondary" className={classes.info}>
            { !authenticated ? (
                <Button className={classes.btn}>
                  <Link to='/login'>
                    <FavoriteBorderIcon color='primary' />
                  </Link>
                  { likeCount }
                </Button> ) : (
                  this.likedPodcast() ? (
                    <Button className={classes.btn} onClick={this.unlikePodcast}>
                      <FavoriteIcon color='primary' />
                      { likeCount }
                    </Button>
                  ) : (
                    <Button className={classes.btn} onClick={this.likePodcast}>
                      <FavoriteBorderIcon color='primary' />
                      { likeCount }
                    </Button>
                  )
                )
            }
            {'Posted ' + dayjs(createdAt).fromNow()} 
            
        </Typography>
      </div>
      <CardMedia 
        className={classes.cover}
        image={userImage}
        title="Live from space album cover"
      />
    </Card>
    )
  }
}

Podcasts.propTypes = {
  //podcastId: PropTypes.string.isRequired,
  getPodcast: PropTypes.func.isRequired,
  likePodcast: PropTypes.func.isRequired,
  unlikePodcast: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  podcast: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = {
  getPodcast,
  likePodcast,
  unlikePodcast
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Podcasts));