import { Reducer } from 'redux';
import { Frame, FramesState, FramesActionTypes } from './types';

const initialState: FramesState = {
  fetching: false,
  update: false,
  errors: '',
  open: false,
  step: 1,
  selectedFrame: <Frame>{},
  similarFrames: [],
};

const reducer: Reducer<FramesState> = (state = initialState, action) => {
  switch (action.type) {
    case FramesActionTypes.FETCH_REQUEST: {
      return { ...state, fetching: true };
    }
    case FramesActionTypes.FETCH_SUCCESS: {
      return { ...state, fetching: false, similarFrames: action.payload };
    }
    case FramesActionTypes.FETCH_ERROR: {
      return { ...state, fetching: false, errors: action.payload };
    }
    case FramesActionTypes.OPEN: {
      return { ...state, open: true };
    }
    case FramesActionTypes.CLOSE: {
      return { ...state, open: false };
    }
    case FramesActionTypes.SET_STEP: {
      return { ...state, step: action.payload };
    }
    case FramesActionTypes.SET_SELECTED_FRAME: {
      return { ...state, selectedFrame: action.payload };
    }
    case FramesActionTypes.RESET_SELECTED_FRAME: {
      return { ...state, selectedFrame: <Frame>{} };
    }
    case FramesActionTypes.RESET_SIMILAR_FRAMES: {
      return { ...state, similarFrames: [] };
    }
    default: {
      return state;
    }
  }
};

export { reducer as FramesReducer }
