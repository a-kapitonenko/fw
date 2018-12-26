import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { Prescription, BossTypes, Boss, Barcode, Blueprint } from '../../../store/order/types';
import { ApplicationState } from '../../../store';
import * as orderActions from '../../../store/order/actions';
import * as lensesActions from '../../../store/lenses/actions';
import {
  submitSaga,
  saveOrderSaga,
  fetchOrderValuesSaga,
  savePrescriptionSaga,
  saveFittingHeightSaga,
} from '../../../store/order/sagas';
import { 
  submitRequest,
  saveOrderRequest,
  fetchOrderValuesRequest,
  savePrescriptionRequest,
  saveFittingHeightRequest,
} from '../../../api/order';

import * as mockData from '../../mockData';
import { createRequestData } from '../../../helpers/orderSelectionHelper';
import * as configHelper from '../../../helpers/configHelper';

type TSubmitSuccessResponse = {
  success: boolean;
  result: Barcode;
};

type TSaveOrderSuccessResponse = {
  success: boolean;
  id: string;
};

type TFetchSuccessResponse = {
  success: boolean;
  values: any;
};

type TSavePrescriptionSuccessResponse = {
  success: boolean;
  result: string;
};

type TSaveFittingHeightSuccessResponse = {
  success: boolean;
  result: Blueprint;
}

type TFailedResponse = {
  success: boolean;
  error: string;
};

// const localStorageMock = {
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   clear: jest.fn()
// };

// window.localStorage = localStorageMock;

// var localStorageMock = (function() {
//   var store = {};
//   return {
//     getItem: function(key: any) {
//       return store[key];
//     },
//     setItem: function(key: any, value: any) {
//       store[key] = value.toString();
//     },
//     clear: function() {
//       store = {};
//     },
//     removeItem: function(key: any) {
//       delete store[key];
//     }
//   };
// })();

// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('submit order saga order', () => {
  const boss: Boss = mockData.boss;
  const orderAction = orderActions.submitStart(boss);
  
  const generator = cloneableGenerator(submitSaga)(orderAction);

  const successResponse: TSubmitSuccessResponse = {
    success: true,
    result: mockData.barcode,
  };

  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.errorMessage,
  };

  expect(generator.next().value).toEqual(call(submitRequest, boss));

  it('handle success submit response', () => {
    const clone = generator.clone();
    
    expect(clone.next(successResponse).value).toEqual(put(orderActions.submitSuccess()));
    expect(clone.next().value)
      .toEqual(put(orderActions.setBoss(BossTypes.BARCODE, successResponse.result)));
    expect(clone.next().done).toEqual(true);
  });;

  it('handle failed submit response', () => {
    const clone = generator.clone();

    expect(clone.next(failedResponse).value)
      .toEqual(put(orderActions.submitFailed(failedResponse.error)));
    expect(clone.next().done).toEqual(true);
  });
});

describe('save order saga order', () => {
  const state: ApplicationState = mockData.filledState;
  const orderAction = orderActions.saveOrderStart(state);
  
  const generator = cloneableGenerator(saveOrderSaga)(orderAction);

  const successResponse: TSaveOrderSuccessResponse = {
    success: true,
    id: mockData.id,
  };

  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.errorMessage,
  };

  const userId = configHelper.getUserId();
  const request = createRequestData(state);

  expect(generator.next().value).toEqual(call(saveOrderRequest, { ...request, id: userId }));

  it('handle success save order response', () => {
    const clone = generator.clone();
    
    expect(clone.next(successResponse).value).toEqual(put(orderActions.saveOrderSuccess()));
    expect(clone.next().value)
  });;

  it('handle failed submit response', () => {
    const clone = generator.clone();

    expect(clone.next(failedResponse).value)
      .toEqual(put(orderActions.saveOrderFailed(failedResponse.error)));
    expect(clone.next().done).toEqual(true);
  });
});

describe('submit order saga order', () => {
  const id: string = mockData.id;
  const orderAction = orderActions.fetchOrderValuesStart(id);
  
  const generator = cloneableGenerator(fetchOrderValuesSaga)(orderAction);

  const successResponse: TFetchSuccessResponse = {
    success: true,
    values: mockData.values,
  };

  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.valuesErrorMessage,
  };

  expect(generator.next().value).toEqual(call(fetchOrderValuesRequest, id));

  it('handle success fetch response', () => {
    const clone = generator.clone();
    
    expect(clone.next(successResponse).value)
      .toEqual(put(orderActions.fetchOrderValuesSuccess(successResponse.values)));
    expect(clone.next().value)
      .toEqual(put(lensesActions.setInitialValue(successResponse.values.lenses)));
    expect(clone.next().done).toEqual(true);
  });;

  it('handle failed fetch response', () => {
    const clone = generator.clone();

    expect(clone.next(failedResponse).value)
      .toEqual(put(orderActions.fetchOrderValuesFailed(failedResponse.error)));
    expect(clone.next().done).toEqual(true);
  });
});

describe('save prescription saga order', () => {
  const prescription: Prescription = mockData.prescription;
  const orderAction = orderActions.savePrescriptionStart(prescription);
  
  const generator = cloneableGenerator(savePrescriptionSaga)(orderAction);

  const successResponse: TSavePrescriptionSuccessResponse = {
    success: true,
    result: '',
  };

  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.valuesErrorMessage,
  };

  expect(generator.next().value).toEqual(call(savePrescriptionRequest, prescription));

  it('handle success save prescription response', () => {
    const clone = generator.clone();
    
    expect(clone.next(successResponse).value)
      .toEqual(put(orderActions.savePrescriptionSuccess()));
    expect(clone.next().value)
      .toEqual(put(lensesActions.fetchLensesStart(prescription)));
    expect(clone.next().done).toEqual(true);
  });;

  it('handle failed save prescription response', () => {
    const clone = generator.clone();

    expect(clone.next(failedResponse).value)
      .toEqual(put(orderActions.savePrescriptionFailed(failedResponse.error)));
    expect(clone.next().done).toEqual(true);
  });
});

describe('save fitting height saga order', () => {
  const boss: Boss = mockData.boss;
  const height: number = mockData.height;
  const orderAction = orderActions.saveFittingHeightStart(boss, height);
  
  const generator = cloneableGenerator(saveFittingHeightSaga)(orderAction);

  const successResponse: TSaveFittingHeightSuccessResponse = {
    success: true,
    result: mockData.blueprint,
  };

  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.errorMessage,
  };

  expect(generator.next().value)
    .toEqual(put(orderActions.setBoss(BossTypes.FITTING_HEIGHT, height)));
  expect(generator.next().value).toEqual(call(saveFittingHeightRequest, { boss, height }));

  it('handle success save fitting height response', () => {
    const clone = generator.clone();
    
    expect(clone.next(successResponse).value)
      .toEqual(put(orderActions.saveFittingHeightSuccess(successResponse.result)));
    expect(clone.next().done).toEqual(true);
  });;

  it('handle failed save fitting height response', () => {
    const clone = generator.clone();

    expect(clone.next(failedResponse).value)
      .toEqual(put(orderActions.saveFittingHeightFailed(failedResponse.error)));
    expect(clone.next().done).toEqual(true);
  });
});
