import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { FramesState } from './frames/types';
// import { LensesState } from './lenses/types';
import { OrderState } from './order/types';

import { FramesReducer } from './frames/reducer';
import { OrderReducer } from './order/reducer';

export interface ApplicationState {
  routing: RouterState;
  form: any,
  frames: FramesState;
  order: OrderState;
}

export const rootReducer = combineReducers<ApplicationState>({
  routing: routerReducer,
  form: reduxFormReducer,
  frames: FramesReducer,
  order: OrderReducer,
});
