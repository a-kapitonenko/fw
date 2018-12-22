import { put, call, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { Boss, Prescription } from '../../../store/order/types';
import * as lensesActions from '../../../store/lenses/actions';
import { fetchLensesRequest, saveLensRequest, checkLensRequest } from '../../../api/lenses';
import { fetchLensesSaga } from '../../../store/lenses/sagas';
import { createFilterGroupsData } from '../../../helpers/filterHelper'
import * as mockData from '../../mockData';
import { Lens } from '../../../store/lenses/types';
import { ApplicationState } from '../../../store';

describe('fetch lenses saga lenses', () => {
  const prescription: Prescription = mockData.prescription;
  const searchAction = lensesActions.fetchLensesStart(prescription);
  
  const generator = cloneableGenerator(fetchLensesSaga)(searchAction);

  const successResponse = {
    success: true,
    lenses: mockData.lenses,
  };

  const failedResponse = {
    success: false,
    error: mockData.errorMessage,
  };

  expect(generator.next().value).toEqual(call(fetchLensesRequest, prescription));

  describe('check errors when lens selected', () => {
    const clone = generator.clone();
    
    it('handle success fetch response', () => {
      expect(clone.next(successResponse).value).toEqual(put(lensesActions.fetchLensesSuccess(mockData.lenses)));
    });

    // it('handle with selected lens', () => {
    //   const selectedLensGenerator = clone.clone();
    //   const getLens = (state: ApplicationState) => state.order.boss.lens;

    //   expect(selectedLensGenerator.next().value).toEqual(select(getLens));
    // });
  });

  it('handle failed fetch response', () => {
    const clone = generator.clone();

    expect(clone.next(failedResponse).value).toEqual(put(lensesActions.fetchLensesFailed(mockData.errorMessage)));
  });
});
