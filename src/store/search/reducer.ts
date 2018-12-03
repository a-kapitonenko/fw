import { Reducer } from 'redux';
import { ISearchState, SearchActionTypes } from './types';

const initialState: ISearchState = {
  isFetching: false,
  errors: '',
  frames: [],
  selectedFrames: []
};

const reducer: Reducer<ISearchState> = (state = initialState, action) => {
  switch (action.type) {
    case SearchActionTypes.FETCH_REQUEST: {
      return { ...state, isFetching: true };
    }
    case SearchActionTypes.CLOSE_REQUEST: {
      return { ...state, isFetching: false };
    }
    case SearchActionTypes.SET_ERRORS: {
      return { ...state, errors: action.payload };
    }
    case SearchActionTypes.CLEAR_ERRORS: {
      return { ...state, errors: action.payload };
    }
    case SearchActionTypes.SET_FRAMES: {
      return { ...state, frames: action.payload };
    }
    case SearchActionTypes.SET_SELECTED_FRAMES: {
      return { ...state, selectedFrames: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as SearchReducer };
