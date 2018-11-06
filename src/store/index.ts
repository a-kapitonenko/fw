import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

import { FramesState } from './frames/types';
import { SearchPanelState } from './searchPanel/types';

import { FramesReducer } from './frames/reducer';
import { SearchPanelReducer } from './searchPanel/reducer';

export interface ApplicationState {
  routing: RouterState;
  frames: FramesState;
  searchPanel: SearchPanelState;
}

export const rootReducer = combineReducers<ApplicationState>({
  routing: routerReducer,
  frames: FramesReducer,
  searchPanel: SearchPanelReducer,
});
