import { Reducer } from 'redux';
import { ISearchState, SearchActionTypes } from './types';

const initialState: ISearchState = {
  fetching: false,
  errors: '',
  frames: [],
  selectedFrames: []
};

const reducer: Reducer<ISearchState> = (state = initialState, action) => {
  switch (action.type) {
    case SearchActionTypes.FETCH_REQUEST: {
      return { ...state, fetching: true };
    }
    case SearchActionTypes.FETCH_SUCCESS: {
      return { ...state, fetching: false, frames: action.payload };
    }
    case SearchActionTypes.FETCH_ERROR: {
      return { ...state, fetching: false, error: action.payload };
    }
    case SearchActionTypes.SET_SELECTED_FRAMES: {
      return { ...state, selectedFrames: action.payload };
    }
    default: {
      return state
    }
  }
};

export { reducer as SearchReducer };
