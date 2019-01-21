import { Reducer } from 'redux';
import { FramesState, FramesActionTypes, Frame } from './types';
import { saveStart, saveSuccess, saveFailed } from '../index';

const initialState: FramesState = {
  isFetching: false,
  errors: '',
  open: false,
  selectedFrame: <Frame>{},
  similarFrames: {
    isFetching: false,
    errors: '',
    data: [],
  },
};

const reducer: Reducer<FramesState> = (state = initialState, action) => {
  switch (action.type) {
    case FramesActionTypes.OPEN: {
      return {
        ...state,
        open: true,
      };
    }
    case FramesActionTypes.CLOSE: {
      return {
        ...state,
        open: false,
      };
    }
    case FramesActionTypes.SUBMIT_START: {
      return saveStart(state);
    }
    case FramesActionTypes.SUBMIT_SUCCESS: {
      return saveSuccess(state);
    }
    case FramesActionTypes.SUBMIT_FAILED: {
      return saveFailed(state, action.payload);
    }
    case FramesActionTypes.FETCH_SIMILAR_FRAMES_START: {
      return {
        ...state,
        similarFrames: saveStart(state.similarFrames),
      };
    }
    case FramesActionTypes.FETCH_SIMILAR_FRAMES_SUCCESS: {
      return {
        ...state,
        similarFrames: saveSuccess(state.similarFrames, 'data', action.payload),
      };
    }
    case FramesActionTypes.FETCH_SIMILAR_FRAMES_FAILED: {
      return {
        ...state,
        similarFrames: saveFailed(state.similarFrames, action.payload),
      };
    }
    case FramesActionTypes.CHECK_FRAME_START: {
      return saveStart(state);
    }
    case FramesActionTypes.CHECK_FRAME_SUCCESS: {
      return saveSuccess(state);
    }
    case FramesActionTypes.CHECK_FRAME_FAILED: {
      return saveFailed(state, action.payload);
    }
    case FramesActionTypes.SET_SELECTED_FRAME: {
      return {
        ...state,
        selectedFrame: action.payload,
      };
    }
    case FramesActionTypes.CLEAR_SELECTED_FRAME: {
      return {
        ...state,
        selectedFrame: <Frame>{},
      };
    }
    case FramesActionTypes.CLEAR_RESULT: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as FramesReducer };
