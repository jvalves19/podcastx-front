import { 
  SET_PODCASTS,
  SET_PODCAST,
  LOADING_DATA, 
  LIKE_PODCAST, 
  UNLIKE_PODCAST, 
  POST_PODCAST,
  LOADING_UI, 
  SET_ERRORS, 
  CLEAR_ERRORS,
  STOP_LOADING_UI
} from '../types';
import axios from 'axios';

//GET podcasts
export const getPodcasts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
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

//Get Podcast
export const getPodcast = (podcastId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/scream/${podcastId}`)
    .then(podcast => {
      dispatch({ 
        type: SET_PODCAST,
        payload: podcast.data
      });
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch(err => console.log(err));
}

//Post Podcast
export const postPodcast = (newPodcast, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/podcast', newPodcast)
    .then((podcast) => {
      dispatch({
        type: POST_PODCAST,
        payload: podcast.data,
      });
      dispatch(clearErrors());
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
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

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({ 
        type: SET_PODCASTS, 
        payload: res.data.podcasts
      });      
    })
    .catch(() => {
      // dispatch({ 
      //   type: SET_PODCASTS, 
      //   payload: null 
      // })
    })
}

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};