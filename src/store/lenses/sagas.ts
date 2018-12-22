import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects';
import { ApplicationState } from '../index';
import { LensesActionTypes, Lens } from './types';
import { BossTypes } from '../order/types';
import * as lensesActions from './actions';
import * as orderActions from '../order/actions';
import { isEmptyObject } from '../../helpers/mathHelper';
import { fetchLensesRequest, saveLensRequest, checkLensRequest } from '../../api/lenses';

const getLens = (state: ApplicationState) => state.order.boss.lens;

export function* fetchLensesSaga({ payload }: any) {
  try {
    const response = yield call(fetchLensesRequest, payload);

    if (response.success) {
      yield put(lensesActions.fetchLensesSuccess(response.lenses));

      const lens = yield select(getLens);
      
      if (!isEmptyObject(lens)) {
        yield put(lensesActions.checkLensStart(payload.prescription, lens));
      }
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
      yield put(orderActions.setRecommendation(response.recommendation));
    } else {
      yield put(lensesActions.saveLensFailed(response.error));
    }
  } catch (err) {
    yield put(lensesActions.saveLensFailed(err));
  }
}

function* checkLensSaga({ payload }: any) {
  try {
    const response = yield call(checkLensRequest, payload);

    if (response.success) {
      yield put(lensesActions.checkLensSuccess());
    } else {
      yield put(orderActions.setBoss(BossTypes.LENS, {} as Lens));
      yield put(lensesActions.checkLensFailed(response.error));
    }
  } catch (err) {
    yield put(lensesActions.checkLensFailed(err));
  }
}

function* watchLensesFetch() {
  yield takeEvery(LensesActionTypes.FETCH_LENSES_START, fetchLensesSaga);
  yield takeEvery(LensesActionTypes.SAVE_LENS_START, saveLensSaga);
  yield takeEvery(LensesActionTypes.CHECK_LENS_START, checkLensSaga);
}

function* lensesSaga() {
  yield all([fork(watchLensesFetch)]);
}

export default lensesSaga;
