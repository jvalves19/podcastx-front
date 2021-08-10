import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';

//Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

import Grid from '@material-ui/core/Grid';

import StaticProfile from '../components/StaticProfile';
import Podcast from '../components/Podcasts';

class user extends Component {
  state = {
    profile: null
  }
  componentDidMount(){
    const handle = this.props.match.params.handle;
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { podcasts, loading } = this.props.data;

    const podcastsMarkup = loading ? (
      <p> Carregando ... </p>
    ) : podcasts === null ? (
        <p> Este usuário não possui podcasts </p>
    ) : (
      podcasts.map(podcast => <Podcast key={podcast.podcastId} podcast={podcast} />)
    )
    

    return (
      <Grid container>
        <Grid item sm={5} xs={8}>
          {this.state.profile === null ? (
            <p> Carregando perfil ... </p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item sm={5} xs={12}>
          { podcastsMarkup }
        </Grid>        
      </Grid>
    )
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, { getUserData })(user);