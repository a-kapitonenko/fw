import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { SearchActionTypes } from './types';
import * as searchActions from './actions';
import { fetchFramesRequest } from '../../api/search';

function* fetchFrames({ payload }: any) {
  try {
    const response = yield call(fetchFramesRequest, payload);

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
  yield takeEvery(SearchActionTypes.SEARCH_START, fetchFrames);
}

function* searchSaga() {
  yield all([fork(watchSearchFetch)]);
}

export default searchSaga;
