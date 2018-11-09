import { Reducer } from 'redux';
import { FramesState, FramesActionTypes } from './types';

const initialState: FramesState = {
  fetching: false,
  list: [],
  selected: [],
  errors: '',
}

const reducer: Reducer<FramesState> = (state = initialState, action) => {
  switch (action.type) {
    case FramesActionTypes.FETCH_REQUEST: {
      return { ...state, fetching: true };
    }
    case FramesActionTypes.FETCH_SUCCESS: {
      return { 
        ...state, 
        fetching: false, 
        list: action.payload 
      };
    }
    case FramesActionTypes.FETCH_ERROR: {
      return { 
        ...state, 
        fetching: false, 
        errors: action.payload 
      };
    }
    case FramesActionTypes.ADD_SELECTED: {
      return { 
        ...state, 
        selected: [ ...state.selected, action.payload]
      };
    }
    case FramesActionTypes.SET_SELECTED: {
      return { ...state, selected: action.payload };
    }
    case FramesActionTypes.DELETE_SELECTED: {
      return { 
        ...state, 
        selected: state.selected.filter(frame => frame != action.payload)
      };
    }
    default: {
      return state
    }
  }
};

export { reducer as FramesReducer }
