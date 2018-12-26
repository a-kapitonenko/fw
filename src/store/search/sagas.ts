import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { SearchActionTypes } from './types';
import { Boss } from '../order/types';
import * as searchActions from './actions';
import { searchFramesRequest } from '../../api/search';

type TSearchFrames = {
  type: SearchActionTypes.SEARCH_START;
  payload: {
    boss: Boss;
    upc: string;
  }
};

export function* searchFrames({ payload }: TSearchFrames) {
  try {
    const response = yield call(searchFramesRequest, payload);

    if (response.success) {
      yield put(searchActions.searchSuccess(response.result));
    } else {
      yield put(searchActions.searchFailed(response.error));
    }
  } catch (err) {
    yield put(searchActions.searchFailed(err));
  }
}

function* watchSearchFetch() {
  yield takeEvery(SearchActionTypes.SEARCH_START, searchFrames);
}

function* searchSaga() {
  yield all([fork(watchSearchFetch)]);
}

export default searchSaga;
