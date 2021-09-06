import React, { Component } from 'react'
import PropTypes from 'prop-types';
import '../css/home.css';

//Redux
import { connect } from 'react-redux';
import { getPodcasts } from '../redux/actions/dataActions';

//Material-UI
import Grid from '@material-ui/core/Grid';
//Components
import Podcast from '../components/Podcasts';

class home extends Component {
    componentDidMount(){
        this.props.getPodcasts();
    }

    render() {
        const { podcasts, loading } = this.props.data;

        let recentePodcastsMarkup = !loading ? (
            podcasts.map((podcast) => <Podcast key={podcast.podcastId} podcast={podcast} />)
        ) : (<p> Carregando ... </p>);

        return (
            <section className="banner">
                <Grid container>
                    <Grid item sm={5} xs={12}>
                        <p> Categorias ... </p>
                    </Grid>
                    <Grid item sm={5} xs={4}>
                        {recentePodcastsMarkup}
                    </Grid>
                </Grid>
            </section>
        );
    }
}

home.propTypes = {
    getPodcasts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}

//data = dados do podcast
const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getPodcasts })(home);