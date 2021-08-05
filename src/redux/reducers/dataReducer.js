import { SET_PODCASTS, LIKE_PODCAST, UNLIKE_PODCAST, LOADING_PODCAST } from "../types";

const initialState = {
  podcasts: [],
  podcast: {},
  loading: false
};

export default function(state = initialState, action){
  switch (action.type) {
    case LOADING_PODCAST:
      return {
        ...state,
        loading: true
      }
    case SET_PODCASTS:
      return {
        ...state,
        podcasts: action.payload,
        loading: false
      }
    case LIKE_PODCAST:
    case UNLIKE_PODCAST:
      let i = state.podcasts.findIndex((podcast) => podcast.podcastId === action.payload.podcastId);
      state.podcasts[i] = action.payload
      return {
        ...state,
      }

    default: 
      return state;
  }
}