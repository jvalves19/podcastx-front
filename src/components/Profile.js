import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';

class Profile extends Component {
  constructor(){
    super();
    const token = localStorage.FBIdToken;
    if (token){
        this.state = {
            authenticated: true,
        }
    }
  }
  
  render() {   
    const { 
      user : { 
        handle, imageUrl, bio, website, location, createdAt
      } 
    } = this.props;
    const { authenticated} = this.state;
    
    let currentUser = authenticated ? (<p> Autenticado </p>) : (<p> não autenticado </p>)

    return (
      <Grid container>
        { currentUser }

        <Grid item sm={5} xs={12}>
          <h5> Nome: { handle } </h5>
          <h5> Bio: { bio } </h5>
          <h5> Website: { website } </h5>
          <h5> Location: { location } </h5>
          <h5> Membro desde: { createdAt } </h5>
        </Grid>
        <Grid item sm={5} xs={8}>
          <h1> Perfil do Usuário </h1>   
          <hr />           
          <img 
              src={ imageUrl }
              alt="MDN logo" 
              height="240"
              width="240"
          />
        </Grid>
      </Grid>
    )
  }
}

export default Profile
