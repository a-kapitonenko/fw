import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { LensesActionTypes, Lens } from './types';
import { IOrderState, Prescription, BossTypes } from '../order/types';
import * as orderActions from '../order/actions';

import { getLenses } from '../../test/lenses';
import { saveLensInformation } from '../../test/order';

// export const fetchRequest = () => action(LensesActionTypes.FETCH_REQUEST);
// export const closeReauest = () => action(LensesActionTypes.CLOSE_REQUEST);
export const setErrors = (errors: string) => action(LensesActionTypes.SET_ERRORS, errors);
export const clearErrors = () => action(LensesActionTypes.CLEAR_ERRORS);
export const setLenses = (lenses: Lens[]) => action(LensesActionTypes.SET_LENSES, lenses);

export const fetchLenses: any = (order: IOrderState) => (dispatch: Dispatch) => {
  dispatch(orderActions.fetchRequest());

  return new Promise((resolver) => {
    const response = getLenses(order);
    
    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    dispatch(orderActions.closeRequest());

    if (response.success) {
      dispatch(setLenses(response.lenses));
    } else { 
      dispatch(setErrors(response.errors));
    }
  })
  .catch((errors: any) => dispatch(setErrors(errors)))
};

export const saveLens: any = (prescription: Prescription, lens: Lens) => (dispatch: Dispatch) => {
  dispatch(orderActions.fetchRequest());

  return new Promise((resolver) => {
    const response = saveLensInformation(prescription, lens)

    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    dispatch(orderActions.closeRequest());

    if (response.success) {
      dispatch(orderActions.setRecommendation(response.recommendation));
      dispatch(orderActions.setBoss(BossTypes.LENS, lens));

    } else { 
      dispatch(setErrors(response.errors));
    }
  })
  .catch((errors: any) => dispatch(setErrors(errors)))
};
