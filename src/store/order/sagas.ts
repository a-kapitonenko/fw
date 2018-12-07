import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { OrderActionTypes, BossTypes } from './types';
import * as orderActions from './actions';
import * as lensesActions from '../lenses/actions';
import { submitRequest, saveOrderRequest, savePrescriptionRequest, saveFittingHeightRequest } from '../../api/order';

function* submitSaga({ payload }: any) {
  try {
    const response = yield call(submitRequest, payload);

    if (response.success) {
      yield put(orderActions.submitSuccess());
      yield put(orderActions.setBoss(BossTypes.BARCODE, response.result));
    } else {
      yield put(orderActions.submitFailed(response.error));
    }
  } catch (err) {
    yield put(orderActions.submitFailed(err));
  }
}

function* saveOrderSaga({ payload }: any) {
  try {
    const response = yield call(saveOrderRequest, payload);

    if (response.success) {
      yield put(orderActions.saveOrderSuccess());
    } else {
      yield put(orderActions.saveOrderFailed(response.error));
    }
  } catch (err) {
    yield put(orderActions.saveOrderFailed(err));
  }
}

function* savePrescriptionSaga({ payload }: any) {
  try {
    const response = yield call(savePrescriptionRequest, payload);

    if (response.success) {
      yield put(orderActions.savePrescriptionSuccess());
      yield put(lensesActions.fetchLensesStart(payload))
    } else {
      yield put(orderActions.savePrescriptionFailed(response.error));
    }
  } catch (err) {
    yield put(orderActions.savePrescriptionFailed(err));
  }
}

function* saveFittingHeight({ payload }: any) {
  yield put(orderActions.setBoss(BossTypes.FITTING_HEIGHT, payload.height));

  try {
    const response = yield call(saveFittingHeightRequest, payload);

    if (response.success) {
      yield put(orderActions.saveFittingHeightSuccess(response.result));
    } else {
      yield put(orderActions.saveFittingHeightFailed(response.error));
    }
  } catch (err) {
    yield put(orderActions.saveFittingHeightFailed(err));
  }
}

function* watchOrderFetch() {
  yield takeEvery(OrderActionTypes.SUBMIT_START, submitSaga);
  yield takeEvery(OrderActionTypes.SAVE_ORDER_START, saveOrderSaga);
  yield takeEvery(OrderActionTypes.SAVE_PRESCRIPTION_START, savePrescriptionSaga);
  yield takeEvery(OrderActionTypes.SAVE_FITTING_HEIGHT_START, saveFittingHeight);
}

function* orderSaga() {
  yield all([fork(watchOrderFetch)]);
}

export default orderSaga;
