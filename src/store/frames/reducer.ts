import { Reducer } from 'redux';
import { FramesState, FramesActionTypes } from './types';

const initialState: FramesState = {
  fetching: false,
  list: [],
  selected: [],
  errors: undefined,
}

const reducer: Reducer<FramesState> = (state = initialState, action) => {
  switch (action.type) {
    case FramesActionTypes.FETCH_REQUEST: {
      return { ...state, fetching: true }
    }
    case FramesActionTypes.FETCH_SUCCESS: {
      return { ...state, fetching: false, list: action.payload }
    }
    case FramesActionTypes.FETCH_ERROR: {
      return { ...state, fetching: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
};

export { reducer as FramesReducer }
