import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { Frame } from '../types';
import { BossTypes, Boss } from '../../order/types';
import { 
  submitSaga,
  fetchSimilarFramesSaga,
  checkFrameSaga,
  clearResultSaga,
} from '../sagas';
import * as framesActions from '../actions';
import * as orderActions from '../../order/actions';
import * as filterActions from '../../filter/actions';
import * as searchActions from '../../search/actions';
import { submitRequest, fetchSimilarFramesRequest, checkFrameRequest } from '../../../api/frames';
import * as mockData from '../../../mockData';

type TSubmitSuccessResponse = {
  success: boolean;
  result: {
    message: string;
    fittingHeight: any;
  };
};

type TFetchSuccessResponse = {
  success: boolean;
  similarFrames: Frame[];
};

type TCheckSuccessResponse = {
  success: boolean;
  result: string;
};

type TFailedResponse = {
  success: boolean;
  error: string;
};

describe('submit frames saga frames', () => {
  const boss: Boss = mockData.boss;
  const frame: Frame = mockData.frame;
  const searchAction = framesActions.submitStart(boss, frame);

  const generator = cloneableGenerator(submitSaga)(searchAction);

  const successResponse: TSubmitSuccessResponse = {
    success: true,
    result: {
      message: mockData.message,
      fittingHeight: mockData.fittingHeight,
    },
  };

  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.errorMessage,
  };

  expect(generator.next().value).toEqual(call(submitRequest, { boss, frame }));

  it('handle success submit response', () => {
    const clone = generator.clone();

    expect(clone.next(successResponse).value).toEqual(put(framesActions.submitSuccess()));
    expect(clone.next().value).toEqual(put(framesActions.close()));
    expect(clone.next().value).toEqual(put(orderActions.setBoss(BossTypes.FRAME, frame)));
    expect(clone.next().value).toEqual(put(orderActions.setMessage(successResponse.result.message)));
    expect(clone.next().value)
      .toEqual(put(orderActions.setFittingProperties(successResponse.result.fittingHeight)));
    expect(clone.next().done).toEqual(true);
  });

  it('handle failed submit response', () => {
    const clone = generator.clone();

    expect(clone.next(failedResponse).value)
      .toEqual(put(framesActions.submitFailed(failedResponse.error)));

    expect(clone.next().done).toEqual(true);
  });
});

describe('fetch frames saga frames', () => {
  const boss: Boss = mockData.boss;
  const searchAction = framesActions.fetchSimilarFramesStart(boss);

  const generator = cloneableGenerator(fetchSimilarFramesSaga)(searchAction);

  const successResponse: TFetchSuccessResponse = {
    success: true,
    similarFrames: mockData.frames,
  };

  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.errorMessage,
  };

  expect(generator.next().value).toEqual(call(fetchSimilarFramesRequest, boss));

  it('handle success fetch response', () => {
    const clone = generator.clone();

    expect(clone.next(successResponse).value)
      .toEqual(put(framesActions.fetchSimilarFramesSuccess(successResponse.similarFrames)));
    expect(clone.next().done).toEqual(true);
  });

  it('handle failed fetch response', () => {
    const clone = generator.clone();

    expect(clone.next(failedResponse).value)
    .toEqual(put(framesActions.fetchSimilarFramesFailed(failedResponse.error)));
    expect(clone.next().done).toEqual(true);
  });
});

describe('check frames saga frames', () => {
  const boss: Boss = mockData.boss;
  const searchAction = framesActions.checkFrameStart(boss);

  const generator = cloneableGenerator(checkFrameSaga)(searchAction);

  const successResponse: TCheckSuccessResponse = {
    success: true,
    result: '',
  };

  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.checkFrameErrorMessage,
  };

  expect(generator.next().value).toEqual(call(checkFrameRequest, boss));

  it('handle success check response', () => {
    const clone = generator.clone();

    expect(clone.next(successResponse).value).toEqual(put(framesActions.checkFrameSuccess()));
    expect(clone.next().done).toEqual(true);
  });

  it('handle failed check response', () => {
    const clone = generator.clone();

    expect(clone.next(failedResponse).value)
      .toEqual(put(framesActions.checkFrameFailed(failedResponse.error)));
    expect(clone.next().done).toEqual(true);
  });
});

describe('clear result saga frames', () => {
  const generator = cloneableGenerator(clearResultSaga)();

  it('test work correctly', () => {
    expect(generator.next().value).toEqual(put(filterActions.clearResult()));
    expect(generator.next().value).toEqual(put(searchActions.clearResult()));
    expect(generator.next().done).toEqual(true);
  });
});