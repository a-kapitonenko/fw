import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import { all, fork } from 'redux-saga/effects';
import { FramesState } from './frames/types';
import { FramesReducer } from './frames/reducer';
import framesSaga from './frames/sagas';
import { ILensesState } from './lenses/types';
import { LensesReducer } from './lenses/reducer';
import lensesSaga from './lenses/sagas';
import { IOrderState } from './order/types';
import { OrderReducer } from './order/reducer';
import orderSaga from './order/sagas';
import { IFilterState } from './filter/types';
import { FilterReducer } from './filter/reducer';
import filterSaga from './filter/sagas';
import { ISearchState } from './search/types';
import { SearchReducer } from './search/reducer';
import searchSaga from './search/sagas';

export const saveStart = (state: any) => ({
  ...state,
  isFetching: true,
  errors: '',
});

export const saveSuccess = (state: any, type?: any, data?: any) => {
  const object = {};

  if (type) {
    object[type] = data;
  }

  return { ...state, isFetching: false, ...object };
};

export const saveFailed = (state: any, error: string) => ({
  ...state,
  isFetching: false,
  errors: error,
});

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
    fork(framesSaga),
    fork(lensesSaga),
    fork(orderSaga),
    fork(filterSaga),
    fork(searchSaga),
  ]);
}
