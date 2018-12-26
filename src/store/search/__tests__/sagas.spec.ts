import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { Boss } from '../../order/types';
import { Frame } from '../../frames/types';
import * as searchActions from '../actions';
import { searchFramesRequest } from '../../../api/search';
import { searchFrames } from '../sagas';
import * as mockData from '../../../mockData';

type TFetchSuccessResponse = {
  success: boolean;
  result: Frame[];
};

type TFailedResponse = {
  success: boolean;
  error: string;
};

describe('fetch frames search saga', () => {
  const boss: Boss = mockData.boss;
  const upc: string = '82850523738';
  const searchAction = searchActions.searchStart(boss, upc);
  
  const generator = cloneableGenerator(searchFrames)(searchAction);
  
  const successResponse: TFetchSuccessResponse = {
    success: true,
    result: mockData.frames,
  };
  
  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.errorMessage,
  };

  expect(generator.next().value).toEqual(call(searchFramesRequest, { boss, upc }));

  it('handle success fetch response', () => {
    const clone = generator.clone();

    expect(clone.next(successResponse).value).toEqual(put(searchActions.searchSuccess(successResponse.result)));
    expect(clone.next().done).toEqual(true);
  });

  it('handle failed fetch response', () => {
    const clone = generator.clone();
    
    expect(clone.next(failedResponse).value).toEqual(put(searchActions.searchFailed(failedResponse.error)));
    expect(clone.next().done).toEqual(true);
  });
});
