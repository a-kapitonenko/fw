import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { FilterActionTypes } from './types';
import * as filterActions from './actions';
import { fetchGroupsRequest, fetchFramesRequest } from '../../api/filter';
import { createFilterGroupsData } from '../../helpers/filterHelper';

export function* fetchGroups() {
  try {
    const response = yield call(fetchGroupsRequest);

    if (response.success) {
      const groups = createFilterGroupsData(response.result);

      yield put(filterActions.fetchGroupsSuccess(groups));
    } else {
      yield put(filterActions.fetchGroupsFailed(response.error));
    }
  } catch (err) {
    yield put(filterActions.fetchGroupsFailed(err));
  }
}

export function* fetchFrames({ payload }: any) {
  try {
    const response = yield call(fetchFramesRequest, payload);

    if (response.success) {
      yield put(filterActions.filteringSuccess(response.frames));
    } else {
      yield put(filterActions.filteringFailed(response.error));
    }
  } catch (err) {
    yield put(filterActions.filteringFailed(err));
  }
}

function* watchFilterFetch() {
  yield takeEvery(FilterActionTypes.FETCH_GROUPS_START, fetchGroups);
  yield takeEvery(FilterActionTypes.FILTERING_START, fetchFrames);
}

function* filterSaga() {
  yield all([fork(watchFilterFetch)]);
}

export default filterSaga;
