import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { FilterActionTypes } from './types';
import * as filterActions from './actions';
import { fetchGroupsRequest, fetchFramesRequest } from '../../api/filter';
import { createFilterGroupsData } from '../../helpers/filterHelper';

function* fetchGroups() {
  try {
    yield put(filterActions.fetchRequest());

    const response = yield call(fetchGroupsRequest);

    yield put(filterActions.closeRequest());

    if (response.success) {
      const groups = createFilterGroupsData(response.result);

      yield put(filterActions.setGroups(groups));
    } else {
      yield put(filterActions.setErrors(response.error));
    }
  } catch (err) {
    yield put(filterActions.setErrors(err));
  }
}

function* fetchFrames({ payload }: any) {
  try {
    yield put(filterActions.fetchRequest());

    const response = yield call(fetchFramesRequest, payload);

    yield put(filterActions.closeRequest());

    if (response.success) {
      yield put(filterActions.setFrames(response.frames));
    } else {
      yield put(filterActions.setErrors(response.error));
    }
  } catch (err) {
    yield put(filterActions.setErrors(err));
  }
}

function* watchFilterFetch() {
  yield takeEvery(FilterActionTypes.FETCH_GROUPS, fetchGroups);
  yield takeEvery(FilterActionTypes.FETCH_FRAMES, fetchFrames);
}

function* filterSaga() {
  yield all([fork(watchFilterFetch)]);
}

export default filterSaga;
