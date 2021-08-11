import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deletePodcast } from '../redux/actions/dataActions';

const styles = {

}

class DeletePodcast extends Component {
  state = {
    open: false
  }
  handleOpen = () => {
    this.setState({
      open: true
    })
  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }
  
  deletePodcast = () => {
    this.props.deletePodcast(this.props.podcastId);
    this.setState({ open: false });    
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <Button onClick={this.handleOpen} className={classes.deleteButton}>
          <DeleteOutline color='secondary'/>
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
          <DialogTitle>
            Deseja deletar o podcast?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancelar
            </Button>
            <Button onClick={this.deletePodcast} color='primary'>
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

deletePodcast.propTypes = {
  deletePodcast: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  podcastId: PropTypes.string.isRequired 
}

export default connect(null, { deletePodcast })(withStyles(styles)(DeletePodcast));