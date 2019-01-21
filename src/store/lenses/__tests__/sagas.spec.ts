import { put, call, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { Prescription, BossTypes } from '../../order/types';
import { Lens } from '../types';
import { fetchLensesSaga, saveLensSaga, checkLensSaga } from '../sagas';
import * as lensesActions from '../actions';
import * as orderActions from '../../order/actions';
import { fetchLensesRequest, saveLensRequest, checkLensRequest } from '../../../api/lenses';
import { getLensFromState } from '../../../helpers/lensesHelper';
import * as mockData from '../../../mockData';

type TFetchSuccessResponse = {
  success: boolean;
  lenses: Lens[];
};

type TSaveSuccessResponse = {
  success: boolean;
  recommendation: string;
};

type TCheckSuccessResponse = {
  success: boolean;
  result: string;
};

type TFailedResponse = {
  success: boolean;
  error: string;
};

describe('fetch lenses saga lenses', () => {
  const prescription: Prescription = mockData.prescription;
  const searchAction = lensesActions.fetchLensesStart(prescription);
  
  const generator = cloneableGenerator(fetchLensesSaga)(searchAction);

  const successResponse: TFetchSuccessResponse = {
    success: true,
    lenses: mockData.lenses,
  };

  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.errorMessage,
  };

  expect(generator.next().value).toEqual(call(fetchLensesRequest, prescription));

  describe('test working when lens selected', () => {
    const clone = generator.clone();
    
    it('handle success fetch response', () => {
      expect(clone.next(successResponse).value).toEqual(put(lensesActions.fetchLensesSuccess(mockData.lenses)));
    });

    it('handle with selected lens', () => {
      expect(clone.next().value).toEqual(select(getLensFromState));
      expect(clone.next(mockData.lens).value).toEqual(put(lensesActions.checkLensStart(prescription, mockData.lens)));
      expect(clone.next().done).toEqual(true);
    });
  });

  it('handle failed fetch response', () => {
    const clone = generator.clone();

    expect(clone.next(failedResponse).value).toEqual(put(lensesActions.fetchLensesFailed(mockData.errorMessage)));
    expect(clone.next().done).toEqual(true);
  });
});

describe('save lens saga lenses', () => {
  const prescription: Prescription = mockData.prescription;
  const lens: Lens = mockData.lens;

  const searchAction = lensesActions.saveLensStart(prescription, lens);
  
  const generator = cloneableGenerator(saveLensSaga)(searchAction);

  const successResponse: TSaveSuccessResponse = {
    success: true,
    recommendation: mockData.recommendation,
  };

  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.errorMessage,
  };

  expect(generator.next().value).toEqual(put(orderActions.setBoss(BossTypes.LENS, lens)));
  expect(generator.next().value).toEqual(call(saveLensRequest, { prescription, lens }));

  it('handle success save response', () => {
    const clone = generator.clone();

    expect(clone.next(successResponse).value).toEqual(put(lensesActions.saveLensSuccess()));
    expect(clone.next().value).toEqual(put(orderActions.setRecommendation(mockData.recommendation,)));
    expect(clone.next().done).toEqual(true);
  });

  it('handle failed save response', () => {
    const clone = generator.clone();

    expect(clone.next(failedResponse).value).toEqual(put(lensesActions.saveLensFailed(mockData.errorMessage)));
    expect(clone.next().done).toEqual(true);
  });
});

describe('check lens saga lenses', () => {
  const prescription: Prescription = mockData.prescription;
  const lens: Lens = mockData.lens;

  const searchAction = lensesActions.checkLensStart(prescription, lens);
  
  const generator = cloneableGenerator(checkLensSaga)(searchAction);

  const successResponse: TCheckSuccessResponse = {
    success: true,
    result: '',
  };

  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.checkLensErrorMessage,
  };

  expect(generator.next().value).toEqual(call(checkLensRequest, { prescription, lens }));

  it('handle success check response', () => {
    const clone = generator.clone();

    expect(clone.next(successResponse).value).toEqual(put(lensesActions.checkLensSuccess()));
    expect(clone.next().done).toEqual(true);
  });

  it('handle failed check response', () => {
    const clone = generator.clone();
    const emptyLens: Lens = {} as Lens; 

    expect(clone.next(failedResponse).value).toEqual(put(orderActions.setBoss(BossTypes.LENS, emptyLens)));
    expect(clone.next().value).toEqual(put(lensesActions.checkLensFailed(failedResponse.error)));
    expect(clone.next().done).toEqual(true);
  });
});
