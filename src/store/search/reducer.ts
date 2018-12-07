import { Reducer } from 'redux';
import { ISearchState, SearchActionTypes } from './types';
import { saveStart, saveSuccess, saveFailed } from '../index';

const initialState: ISearchState = {
  isFetching: false,
  errors: '',
  frames: [],
  selectedFrames: []
};

const reducer: Reducer<ISearchState> = (state = initialState, action) => {
  switch (action.type) {
    case SearchActionTypes.SEARCH_START: return saveStart(state);
    case SearchActionTypes.SEARCH_SUCCESS: return saveSuccess(state, 'frames', action.payload);
    case SearchActionTypes.SEARCH_FAILED: return saveFailed(state, action.payload);
    case SearchActionTypes.SET_SELECTED_FRAMES: {
      return { ...state, selectedFrames: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as SearchReducer };
