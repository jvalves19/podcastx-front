import { SET_PODCASTS, LOADING_PODCAST, LIKE_PODCAST, UNLIKE_PODCAST, SET_ERRORS } from '../types';
import axios from 'axios';

//GET podcasts
export const getPodcasts = () => (dispatch) => {
  dispatch({ type: LOADING_PODCAST });
  axios
    .get('/podcasts')
    .then((podcast) => {
      dispatch({
        type: SET_PODCASTS,
        payload: podcast.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_PODCASTS,
        payload: []
      })        
    })
}

//Like Podcast
export const likePodcast = (podcastId) => (dispatch) => {
  axios
    .get(`/podcast/${podcastId}/like`)
    .then((podcast) => {
      dispatch({
        type: LIKE_PODCAST,
        payload: podcast.data
      })
    })
    .catch(err => console.log(err));
} 

//Unlike Podcast
export const unlikePodcast = (podcastId) => (dispatch) => {
  axios
    .get(`/podcast/${podcastId}/unlike`)
    .then((podcast) => {
      dispatch({
        type: UNLIKE_PODCAST,
        payload: podcast.data
      })
    })
    .catch(err => console.log(err));
} 