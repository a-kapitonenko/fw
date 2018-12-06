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
    case SearchActionTypes.SEARCH_START: {
      return { ...state, isFetching: true, errors: '' };
    }
    case SearchActionTypes.SEARCH_SUCCESS: {
      return { ...state, isFetching: false, frames: action.payload };
    }
    case SearchActionTypes.SEARCH_FAILED: {
      return { ...state, isFetching: false, errors: action.paylaod };
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
