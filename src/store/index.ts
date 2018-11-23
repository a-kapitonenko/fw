import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

import { FramesState } from './frames/types';
import { ILensesState } from './lenses/types';
import { IOrderState } from './order/types';
import { IFilterState } from './filter/types';
import { ISearchState } from './search/types';

import { FramesReducer } from './frames/reducer';
import { LensesReducer } from './lenses/reducer';
import { OrderReducer } from './order/reducer';
import { FilterReducer } from './filter/reducer';
import { SearchReducer } from './search/reducer';

export interface ApplicationState {
  routing: RouterState;
  frames: FramesState;
  lenses: ILensesState;
  order: IOrderState;
  filter: IFilterState;
  search: ISearchState;
}

export const rootReducer = combineReducers<ApplicationState>({
  routing: routerReducer,
  frames: FramesReducer,
  lenses: LensesReducer,
  order: OrderReducer,
  filter: FilterReducer,
  search: SearchReducer,
});
