import { Reducer } from 'redux';
import { Frame, FramesState, FramesActionTypes } from './types';

const initialState: FramesState = {
  open: false,
  fetching: false,
  list: [],
  selected: [],
  selectedFrame: <Frame>{},
  similarFrames: [],
  errors: '',
  UPCSearch: {
    fetching: false,
    list: [],
    errors: '',
    selectedFrames: [],
    selectedFrame: <Frame>{}
  }
}

const reducer: Reducer<FramesState> = (state = initialState, action) => {
  switch (action.type) {
    case FramesActionTypes.OPEN: {
      return { ...state, open: true };
    }
    case FramesActionTypes.CLOSE: {
      return { ...state, open: false };
    }
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
    case FramesActionTypes.SET_SELECTED_FRAME: {
      return { ...state, selectedFrame: action.payload }
    }
    case FramesActionTypes.SET_SIMILAR_FRAMES: {
      return { ...state, similarFrames: action.payload }
    }



    case FramesActionTypes.FETCH_UPC: {
      return { ...state, UPCSearch: { ...state.UPCSearch, fetching: true }};
    }
    case FramesActionTypes.FETCH_UPC_ERROR: {
      return { ...state, UPCSearch: { ...state.UPCSearch, errors: action.payload, fetching: false } };
    }
    case FramesActionTypes.FETCH_UPC_SUCCESS: {
      return { ...state, UPCSearch: { ...state.UPCSearch, list: action.payload, fetching: false } };
    }
    case FramesActionTypes.SET_UPC_SELECTED: {
      return { ...state, UPCSearch: { ...state.UPCSearch, selectedFrames: action.payload } };
    }
    case FramesActionTypes.SET_UPC_SELECTED_FRAME: {
      return { ...state, UPCSearch: { ...state.UPCSearch, selectedFrame: action.payload } };
    }
    default: {
      return state
    }
  }
};

export { reducer as FramesReducer }
