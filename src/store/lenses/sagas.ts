import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { LensesActionTypes } from './types';
import { BossTypes } from '../order/types';
import * as lensesActions from './actions';
import * as orderActions from '../order/actions';
import { fetchLensesRequest, saveLensRequest } from '../../api/order';

function* fetchLensesSaga({ payload }: any) {
  try {
    const response = yield call(fetchLensesRequest, payload);

    if (response.success) {
      yield put(lensesActions.fetchLensesSuccess(response.lenses));
    } else {
      yield put(lensesActions.fetchLensesFailed(response.error));
    }
  } catch (err) {
    yield put(lensesActions.fetchLensesFailed(err));
  }
}

function* saveLensSaga({ payload }: any) {
  yield put(orderActions.setBoss(BossTypes.LENS, payload.lens));

  try {
    const response = yield call(saveLensRequest, payload);

    if (response.success) {
      yield put(lensesActions.saveLensSuccess());
      yield put(orderActions.setRecommendation(response.recommendation))
    } else {
      yield put(lensesActions.saveLensFailed(response.error));
    }
  } catch (err) {
    yield put(lensesActions.saveLensFailed(err));
  }
}

function* watchLensesFetch() {
  yield takeEvery(LensesActionTypes.FETCH_LENSES_START, fetchLensesSaga);
  yield takeEvery(LensesActionTypes.SAVE_LENS_START, saveLensSaga);
}

function* lensesSaga() {
  yield all([fork(watchLensesFetch)]);
}

export default lensesSaga;
