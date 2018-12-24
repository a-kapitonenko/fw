import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { Groups } from '../../../store/filter/types';
import { Boss } from '../../../store/order/types';
import { Frame } from '../../../store/frames/types';
import { fetchGroups, fetchFrames } from '../../../store/filter/sagas';
import * as filterActions from '../../../store/filter/actions';
import { fetchGroupsRequest, fetchFramesRequest } from '../../../api/filter';
import { createFilterGroupsData } from '../../../helpers/filterHelper'
import * as mockData from '../../mockData';

type TGroupsSuccessResponse = {
  success: boolean;
  result: Groups;
};

type TFramesSuccessResponse = {
  success: boolean;
  frames: Frame[];
};

type TFailedResponse = {
  success: boolean;
  error: string;
};

describe('fetch groups saga filter', () => {
  const generator = cloneableGenerator(fetchGroups)();

  const successResponse: TGroupsSuccessResponse = {
    success: true,
    result: mockData.groups,
  };

  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.errorMessage,
  };

  const groups: Groups = createFilterGroupsData(mockData.groups);

  expect(generator.next().value).toEqual(call(fetchGroupsRequest));

  it('handle success fetch response', () => {
    const clone = generator.clone();

    expect(clone.next(successResponse).value).toEqual(put(filterActions.fetchGroupsSuccess(groups)));
    expect(clone.next().done).toEqual(true);
  });

  it('handle failed fetch response', () => {
    const clone = generator.clone();
    
    expect(clone.next(failedResponse).value).toEqual(put(filterActions.fetchGroupsFailed(mockData.errorMessage)));
    expect(clone.next().done).toEqual(true);
  });
});

describe('fetch frames saga filter', () => {
  const boss: Boss = {} as Boss;
  const query: object = mockData.query;
  const filterAction = filterActions.filteringStart(boss, query);

  const generator = cloneableGenerator(fetchFrames)(filterAction);

  const successResponse: TFramesSuccessResponse = {
    success: true,
    frames: mockData.frames,
  };

  const failedResponse: TFailedResponse = {
    success: false,
    error: mockData.errorMessage,
  };

  expect(generator.next().value).toEqual(call(fetchFramesRequest, { boss, query }));

  it('handle success fetch response', () => {
    const clone = generator.clone();

    expect(clone.next(successResponse).value).toEqual(put(filterActions.filteringSuccess(mockData.frames)));
    expect(clone.next().done).toEqual(true);
  });

  it('handle failed fetch response', () => {
    const clone = generator.clone();
    
    expect(clone.next(failedResponse).value).toEqual(put(filterActions.filteringFailed(mockData.errorMessage)));
    expect(clone.next().done).toEqual(true);
  });
});
