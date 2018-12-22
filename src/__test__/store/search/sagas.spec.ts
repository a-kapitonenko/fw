import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { Boss } from '../../../store/order/types';
import * as searchActions from '../../../store/search/actions';
import { fetchFramesRequest } from '../../../api/search';
import { fetchFrames } from '../../../store/search/sagas';
import * as mockData from '../../mockData';

describe('fetch frames search saga', () => {
  const boss: Boss = {} as Boss;
  const upc: string = '82850523738';
  const searchAction = searchActions.searchStart(boss, upc);
  
  const generator = cloneableGenerator(fetchFrames)(searchAction);
  
  const successResponse = {
    success: true,
    result: mockData.frames,
  };
  
  const failedResponse = {
    success: false,
    error: mockData.errorMessage,
  };

  expect(generator.next().value).toEqual(call(fetchFramesRequest, { boss, upc }));

  it('handle success fetch response', () => {
    const clone = generator.clone();

    expect(clone.next(successResponse).value).toEqual(put(searchActions.searchSuccess(mockData.frames)));
    expect(clone.next().done).toEqual(true);
  });

  it('handle failed fetch response', () => {
    const clone = generator.clone();
    
    expect(clone.next(failedResponse).value).toEqual(put(searchActions.searchFailed(mockData.errorMessage)));
    expect(clone.next().done).toEqual(true);
  });
});
