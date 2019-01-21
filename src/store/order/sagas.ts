import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ApplicationState } from '../index';
import { OrderActionTypes, BossTypes, Boss, Prescription } from './types';
import * as orderActions from './actions';
import * as lensesActions from '../lenses/actions';
import * as configHelper from '../../helpers/configHelper';
import { createRequestData } from '../../helpers/orderSelectionHelper'; 
import { 
  submitRequest,
  saveOrderRequest,
  fetchOrderValuesRequest,
  savePrescriptionRequest,
  saveFittingHeightRequest,
} from '../../api/order';

type TSubmitOrder = {
  type: OrderActionTypes.SUBMIT_START;
  payload: Boss;
};

type TSaveOrder = {
  type: OrderActionTypes.SAVE_ORDER_START;
  payload: ApplicationState;
};

type TFetchOrder = {
  type: OrderActionTypes.FETCH_ORDER_VALUES_START;
  payload: string;
};

type TSavePrescription = {
  type: OrderActionTypes.SAVE_PRESCRIPTION_START;
  payload: Prescription;
};

type TSaveFittingHeight = {
  type: OrderActionTypes.SAVE_FITTING_HEIGHT_START;
  payload: {
    boss: Boss;
    height: number;
  };
};

export function* submitSaga({ payload }: TSubmitOrder) {
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

export function* saveOrderSaga({ payload }: TSaveOrder) {
  const userId = configHelper.getUserId();
  const request = createRequestData(payload);

  try {
    const response = yield call(saveOrderRequest, { ...request, id: userId });

    if (response.success) {
      yield put(orderActions.saveOrderSuccess());

      if (userId === null) {
        configHelper.setUserId(response.id);
      }
    } else {
      yield put(orderActions.saveOrderFailed(response.error));
    }
  } catch (err) {
    yield put(orderActions.saveOrderFailed(err));
  }
}

export function* fetchOrderValuesSaga({ payload }: TFetchOrder) {
  try {
    const response = yield call(fetchOrderValuesRequest, payload);

    if (response.success) {
      yield put(orderActions.fetchOrderValuesSuccess(response.values));
      yield put(lensesActions.setInitialValue(response.values.lenses));
    } else {
      yield put(orderActions.fetchOrderValuesFailed(response.error));
    }
  } catch (err) {
    yield put(orderActions.fetchOrderValuesFailed(err));
  }
}

export function* savePrescriptionSaga({ payload }: TSavePrescription) {
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

export function* saveFittingHeightSaga({ payload }: TSaveFittingHeight) {
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
  yield takeEvery(OrderActionTypes.FETCH_ORDER_VALUES_START, fetchOrderValuesSaga);
  yield takeEvery(OrderActionTypes.SAVE_PRESCRIPTION_START, savePrescriptionSaga);
  yield takeEvery(OrderActionTypes.SAVE_FITTING_HEIGHT_START, saveFittingHeightSaga);
}

function* orderSaga() {
  yield all([fork(watchOrderFetch)]);
}

export default orderSaga;
