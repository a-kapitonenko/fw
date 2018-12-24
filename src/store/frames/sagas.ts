import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { FramesActionTypes, Frame } from './types';
import { BossTypes, Boss } from '../order/types';
import * as framesActions from './actions';
import * as orderActions from '../order/actions';
import * as filterActions from '../filter/actions';
import * as searchActions from '../search/actions';
import { submitRequest, fetchSimilarFramesRequest, checkFrameRequest } from '../../api/frames';

type TSubmit = {
  type: FramesActionTypes.SUBMIT_START,
  payload: {
    boss: Boss, 
    frame: Frame,
  },
};

type TfetchSimilarFrames = {
  type: FramesActionTypes.FETCH_SIMILAR_FRAMES_START,
  payload: Boss,
};

type TCheckFrames = {
  type: FramesActionTypes.CHECK_FRAME_START,
  payload: Boss,
};

export function* submitSaga({ payload }: TSubmit) {
  try {
    const response = yield call(submitRequest, payload);

    if (response.success) {
      yield put(framesActions.submitSuccess());
      yield put(framesActions.close());
      yield put(orderActions.setBoss(BossTypes.FRAME, payload.frame));
      yield put(orderActions.setMessage(response.result.message));
      yield put(orderActions.setFittingProperties(response.result.fittingHeight));
    } else {
      yield put(framesActions.submitFailed(response.error));
    }
  } catch (err) {
    yield put(framesActions.submitFailed(err));
  }
}

export function* fetchSimilarFramesSaga({ payload }: TfetchSimilarFrames) {
  try {
    const response = yield call(fetchSimilarFramesRequest, payload);

    if (response.success) {
      yield put(framesActions.fetchSimilarFramesSuccess(response.similarFrames));
    } else {
      yield put(framesActions.fetchSimilarFramesFailed(response.error));
    }
  } catch (err) {
    yield put(framesActions.fetchSimilarFramesFailed(err));
  }
}

export function* checkFrameSaga({ payload }: TCheckFrames) {
  try {
    const response = yield call(checkFrameRequest, payload);

    if (response.success) {
      yield put(framesActions.checkFrameSuccess());
    } else {
      yield put(framesActions.checkFrameFailed(response.error));
    }
  } catch (err) {
    yield put(framesActions.checkFrameFailed(err));
  }
}

export function* clearResultSaga() {
  yield put(filterActions.clearResult());
  yield put(searchActions.clearResult());
}

function* watchFramesFetch() {
  yield takeEvery(FramesActionTypes.FETCH_SIMILAR_FRAMES_START, fetchSimilarFramesSaga);
  yield takeEvery(FramesActionTypes.SUBMIT_START, submitSaga);
  yield takeEvery(FramesActionTypes.CHECK_FRAME_START, checkFrameSaga);
  yield takeEvery(FramesActionTypes.CLEAR_RESULT, clearResultSaga);
}

function* framesSaga() {
  yield all([fork(watchFramesFetch)]);
}

export default framesSaga;
