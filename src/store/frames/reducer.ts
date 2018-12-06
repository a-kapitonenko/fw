import { Reducer } from 'redux';
import { FramesState, FramesActionTypes, Frame } from './types';

const initialState: FramesState = {
  isFetching: false,
  errors: '',
  open: false,
  selectedFrame: <Frame>{},
  similarFrames: {
    isFetching: false,
    errors: '',
    data: []
  },
};

const reducer: Reducer<FramesState> = (state = initialState, action) => {
  switch (action.type) {
    case FramesActionTypes.FETCH_SIMILAR_FRAMES_START: {
      return { ...state, similarFrames: { ...state.similarFrames, isFetching: true, errors: '' } };
    }
    case FramesActionTypes.FETCH_SIMILAR_FRAMES_SUCCESS: {
      return { ...state, similarFrames: { ...state.similarFrames, isFetching: false, data: action.payload } };
    }
    case FramesActionTypes.FETCH_SIMILAR_FRAMES_FAILED: {
      return { ...state, similarFrames: { ...state.similarFrames, isFetching: false, errors: action.payload } };
    }
    case FramesActionTypes.SUBMIT_START: {
      return { ...state, isFetching: true, errors: '' };
    }
    case FramesActionTypes.SUBMIT_SUCCESS: {
      return { ...state, isFetching: false };
    }
    case FramesActionTypes.SUBMIT_FAILED: {
      return { ...state, isFetching: false, errors: action.payload };
    }
    case FramesActionTypes.OPEN: {
      return { ...state, open: true };
    }
    case FramesActionTypes.CLOSE: {
      return { ...state, open: false };
    }
    case FramesActionTypes.SET_SELECTED_FRAME: {
      return { ...state, selectedFrame: action.payload };
    }
    case FramesActionTypes.CLEAR_SELECTED_FRAME: {
      return { ...state, selectedFrame: <Frame>{} };
    }
    default: {
      return state;
    }
  }
};

export { reducer as FramesReducer };
