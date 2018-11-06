import { Reducer } from 'redux';
import { SearchPanelState, SearchPanelActionTypes } from './types';

const initialState: SearchPanelState = {
  open: false,
  anchor: null,
}

const reducer: Reducer<SearchPanelState> = (state = initialState, action) => {
  switch (action.type) {
    case SearchPanelActionTypes.OPEN_SEARCH_PANEL: {
      return { ...state, open: true, anchor: action.payload }
    }
    case SearchPanelActionTypes.CLOSE_SEARCH_PANEL: {
      return { ...state, open: false, anchor: null }
    }
    default: {
      return state
    }
  }
};

export { reducer as SearchPanelReducer }
