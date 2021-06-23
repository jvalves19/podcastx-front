import React, { Component } from 'react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';

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
  render() {
    dayjs.extend(relativeTime);

    const { 
      classes, 
      podcast : { 
        body, createdAt, userImage, userHandle, podcastName, podcastId, likeCount
      } 
    } = this.props;

    return (
      <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {podcastName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            @{userHandle}
          </Typography>
          
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="previous">
            {'spacing{1}' === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
            {'spacing{1}' === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
          
        </div>
        
        <Typography variant="subtitle1" color="textSecondary" className={classes.info}>
            <Button className={classes.btn}>
              <FavoriteBorderIcon color='primary' />
            </Button>
            {'Postado ' + dayjs(createdAt).fromNow()} 
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

export default withStyles(styles)(Podcasts);