import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects';
import { LensesActionTypes, Lens } from './types';
import { BossTypes, Prescription } from '../order/types';
import * as lensesActions from './actions';
import * as orderActions from '../order/actions';
import { isEmptyObject } from '../../helpers/mathHelper';
import { getLensFromState } from '../../helpers/lensesHelper';
import { fetchLensesRequest, saveLensRequest, checkLensRequest } from '../../api/lenses';

type TFetchLenses = {
  type: LensesActionTypes.FETCH_LENSES_START,
  payload: Prescription,
};

type TSaveLens = {
  type: LensesActionTypes.SAVE_LENS_START,
  payload: {
    prescription: Prescription,
    lens: Lens,
  },
};

type TCheckLens = {
  type: LensesActionTypes.CHECK_LENS_START,
  payload: {
    prescription: Prescription,
    lens: Lens,
  },
};

export function* fetchLensesSaga({ payload }: TFetchLenses) {
  try {
    const response = yield call(fetchLensesRequest, payload);

    if (response.success) {
      yield put(lensesActions.fetchLensesSuccess(response.lenses));

      const lens = yield select(getLensFromState);
      
      if (!isEmptyObject(lens)) {
        yield put(lensesActions.checkLensStart(payload, lens));
      }
    } else {
      yield put(lensesActions.fetchLensesFailed(response.error));
    }
  } catch (err) {
    yield put(lensesActions.fetchLensesFailed(err));
  }
}

export function* saveLensSaga({ payload }: TSaveLens) {
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

export function* checkLensSaga({ payload }: TCheckLens) {
  try {
    const response = yield call(checkLensRequest, payload);

    if (response.success) {
      yield put(lensesActions.checkLensSuccess());
    } else {
      const emptyLens: Lens = {} as Lens;

      yield put(orderActions.setBoss(BossTypes.LENS, emptyLens));
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
