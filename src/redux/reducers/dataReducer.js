import { 
  SET_PODCASTS, 
  SET_PODCAST,
  LIKE_PODCAST, 
  UNLIKE_PODCAST, 
  LOADING_DATA, 
  POST_PODCAST 
} from "../types";

const initialState = {
  podcasts: [],
  podcast: {},
  loading: false
};

export default function(state = initialState, action){
  switch (action.type) {
    case LOADING_DATA:
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
    case SET_PODCAST:
      return {
        ...state,
        podcast: action.payload
      }
    case LIKE_PODCAST:
    case UNLIKE_PODCAST:
      let i = state.podcasts.findIndex((podcast) => podcast.podcastId === action.payload.podcastId);
      state.podcasts[i] = action.payload
      if(state.podcast.podcastId === action.payload.podcastId){
        state.podcast = action.payload;
      }
      return {
        ...state,
      }
    case POST_PODCAST:
      return {
        ...state,
        podcasts: [
          action.payload,
          ...state.podcasts
        ]
      }

    default: 
      return state;
  }
}