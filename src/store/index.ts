import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

import { FramesState } from './frames/types';
import { ILensesState } from './lenses/types';
import { IOrderState } from './order/types';
import { IFilterState } from './filter/types';

import { FramesReducer } from './frames/reducer';
import { LensesReducer } from './lenses/reducer';
import { OrderReducer } from './order/reducer';
import { FilterReducer } from './filter/reducer';

export interface ApplicationState {
  routing: RouterState;
  frames: FramesState;
  lenses: ILensesState;
  order: IOrderState;
  filter: IFilterState;
}

export const rootReducer = combineReducers<ApplicationState>({
  routing: routerReducer,
  frames: FramesReducer,
  lenses: LensesReducer,
  order: OrderReducer,
  filter: FilterReducer,
});
