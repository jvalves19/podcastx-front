import React, { Component } from 'react'
import axios from 'axios';

//Material-UI
import Grid from '@material-ui/core/Grid';

//Components
import Scream from '../components/Scream';

class home extends Component {
    state = {
        screams: null
    }
    componentDidMount(){
        axios.get('/screams')
            .then(res => {
                this.setState({
                    screams: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map(scream => <Scream key={scream.screamId} scream={scream}/> )
        ) : <p> Carregando ... </p>
        return (
             <Grid container>
                 <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                 </Grid>
                 <Grid item sm={4} xs={12}>

                 </Grid>
             </Grid>
        );
    }
}

export default home;