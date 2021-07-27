import React, { Component } from 'react'
import axios from 'axios';

//Material-UI
import Grid from '@material-ui/core/Grid';

//Components
import Podcast from '../components/Podcasts';

class home extends Component {
    constructor(){
        super()
        this.state = {
            podcasts: null
        }
    }
    
    componentDidMount(){
        axios.get('/podcasts')
        .then(podcast => {
            this.setState({
                podcasts: podcast.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        let recentePodcastsMarkup = this.state.podcasts ? (
            this.state.podcasts.map(podcast => <Podcast key={podcast.podcastId} podcast={podcast}/> )
        ) : <p> Carregando ... </p>

        return (
             <Grid container>
                 <Grid item sm={5} xs={12}>
                    {recentePodcastsMarkup}
                 </Grid>
                 <Grid item sm={5} xs={8}>
                    <p> Categorias ... </p>
                 </Grid>
             </Grid>
        );
    }
}

export default home;