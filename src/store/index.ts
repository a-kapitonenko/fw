import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

import { FramesState } from './frames/types';

import { FramesReducer } from './frames/reducer';

export interface ApplicationState {
  routing: RouterState;
  frames: FramesState;
}

export const rootReducer = combineReducers<ApplicationState>({
  routing: routerReducer,
  frames: FramesReducer,
});
