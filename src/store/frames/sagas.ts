import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { FramesActionTypes, ErrorTypes } from './types';
import { BossTypes } from '../order/types';
import * as framesActions from './actions';
import * as orderActions from '../order/actions';
import { fetchSimilarFramesRequest, fetchSubmitRequest } from '../../api/frames';

function* fetchSimilarFrames({ payload }: any) {
  try {
    yield put(framesActions.fetchRequest());

    const response = yield call(fetchSimilarFramesRequest, payload);

    yield put(framesActions.closeRequest());

    if (response.success) {
      yield put(framesActions.setSimilarFrames(response.similarFrames));
    } else {
      yield put(framesActions.setError(ErrorTypes.SIMILAR_FRAMES, response.error));
    }
  } catch (err) {
    yield put(framesActions.setError(ErrorTypes.SIMILAR_FRAMES, err));
  }
}

function* fetchSubmit({ payload }: any) {
  try {
    yield put(framesActions.fetchRequest());

    const response = yield call(fetchSubmitRequest, payload);

    yield put(framesActions.closeRequest());

    if (response.success) {
      yield put(framesActions.close());
      yield put(framesActions.setStep(1));
      yield put(orderActions.setBoss(BossTypes.FRAME, payload.frame));
      yield put(orderActions.setMessage(response.result.message));
      yield put(orderActions.setFittingProperties(response.result.fittingHeight));
    } else {
      yield put(framesActions.setError(ErrorTypes.SUBMIT, response.error));
    }
  } catch (err) {
    yield put(framesActions.setError(ErrorTypes.SUBMIT, err));
  }
}

function* watchFramesFetch() {
  yield takeEvery(FramesActionTypes.FETCH_SIMILAR_FRAMES, fetchSimilarFrames);
  yield takeEvery(FramesActionTypes.FETCH_SUBMIT, fetchSubmit);
}

function* framesSaga() {
  yield all([fork(watchFramesFetch)]);
}

export default framesSaga;
