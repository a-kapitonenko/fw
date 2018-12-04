import { Reducer } from 'redux';
import { FramesState, FramesActionTypes, Frame, Errors } from './types';

const initialState: FramesState = {
  isFetching: false,
  errors: <Errors>{
    select: '',
    similarFrames: '',
    submit: '',
  },
  open: false,
  step: 1,
  selectedFrame: <Frame>{},
  similarFrames: [],
};

const reducer: Reducer<FramesState> = (state = initialState, action) => {
  switch (action.type) {
    case FramesActionTypes.FETCH_REQUEST: {
      return { ...state, isFetching: true };
    }
    case FramesActionTypes.CLOSE_REQUEST: {
      return { ...state, isFetching: false };
    }
    case FramesActionTypes.SET_ERROR: {
      return { ...state, errors: { ...state.errors, [action.payload.type]: action.payload.error } };
    }
    case FramesActionTypes.CLEAR_ERROR: {
      return { ...state, errors: { ...state.errors, [action.payload]: '' } };
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
    case FramesActionTypes.SET_SIMILAR_FRAMES: {
      return { ...state, similarFrames: action.payload };
    }
    case FramesActionTypes.RESET_SIMILAR_FRAMES: {
      return { ...state, similarFrames: [] };
    }
    default: {
      return state;
    }
  }
};

export { reducer as FramesReducer };
