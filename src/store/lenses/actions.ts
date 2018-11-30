import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { LensesActionTypes, Lens } from './types';
import { IOrderState } from '../order/types';

import { getLenses } from '../../test/lenses';

export const fetchRequest = () => action(LensesActionTypes.FETCH_REQUEST);
export const fetchSuccess = (list: Lens[]) => action(LensesActionTypes.FETCH_SUCCESS, list);
export const fetchError = (message: string) => action(LensesActionTypes.FETCH_ERROR, message);
export const setError = (error: string) => action(LensesActionTypes.SET_ERROR, error);
export const resetError = () => action(LensesActionTypes.RESET_ERROR);

export const fetchLenses: any = (order: IOrderState) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = getLenses(order);

    resolver(response)
  })
  .then((response: any) => {
    if (response.success) {
      dispatch(fetchSuccess(response.lenses));
    }
  })
};
