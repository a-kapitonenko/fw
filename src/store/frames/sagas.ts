import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { FramesActionTypes } from './types';
import { BossTypes } from '../order/types';
import * as framesActions from './actions';
import * as orderActions from '../order/actions';
import { fetchSimilarFramesRequest, submitRequest } from '../../api/frames';

function* fetchSimilarFramesSaga({ payload }: any) {
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

function* submitSaga({ payload }: any) {
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

function* watchFramesFetch() {
  yield takeEvery(FramesActionTypes.FETCH_SIMILAR_FRAMES_START, fetchSimilarFramesSaga);
  yield takeEvery(FramesActionTypes.SUBMIT_START, submitSaga);
}

function* framesSaga() {
  yield all([fork(watchFramesFetch)]);
}

export default framesSaga;
