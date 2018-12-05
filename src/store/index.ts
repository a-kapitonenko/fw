import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import { all, fork } from 'redux-saga/effects';
import { FramesState } from './frames/types';
import { FramesReducer } from './frames/reducer';
import framesSaga from './frames/sagas';
import { ILensesState } from './lenses/types';
import { LensesReducer } from './lenses/reducer';
import { IOrderState } from './order/types';
import { OrderReducer } from './order/reducer';
import { IFilterState } from './filter/types';
import { FilterReducer } from './filter/reducer';
import filterSaga from './filter/sagas';
import { ISearchState } from './search/types';
import { SearchReducer } from './search/reducer';
import searchSaga from './search/sagas';

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

export function* rootSaga() {
  yield all([
    fork(filterSaga),
    fork(searchSaga),
    fork(framesSaga),
  ]);
}
