import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { SearchActionTypes } from './types';
import * as searchActions from './actions';
import { fetchFramesRequest } from '../../api/search';

function* fetchFrames({ payload }: any) {
  try {
    yield put(searchActions.fetchRequest());

    const response = yield call(fetchFramesRequest, payload);

    yield put(searchActions.closeRequest());

    if (response.success) {
      yield put(searchActions.setFrames(response.result));
    } else {
      yield put(searchActions.setErrors(response.error));
    }
  } catch (err) {
    yield put(searchActions.setErrors(err));
  }
}

function* watchSearchFetch() {
  yield takeEvery(SearchActionTypes.FETCH_FRAMES, fetchFrames);
}

function* searchSaga() {
  yield all([fork(watchSearchFetch)]);
}

export default searchSaga;
