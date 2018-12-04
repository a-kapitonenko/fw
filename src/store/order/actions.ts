import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import * as lensesActions from '../lenses/actions';
import { OrderActionTypes, Prescription, IOrderState, Blueprint, BossTypes } from './types';
import { Lens } from '../lenses/types';

import { 
  savePrescriptionInformation, 
  saveOrderInformation, 
  checkFrameCompatibility, 
  saveFittingHeightInformation, 
  checkLensError,
} from '../../test/order';

export const fetchRequest = () => action(OrderActionTypes.FETCH_REQUEST);
export const closeRequest = () => action(OrderActionTypes.CLOSE_REQUEST);
export const setErrors = (type: string, error: string) => action(OrderActionTypes.SET_ERRORS, { type, error });
export const clearErrors = (type: string) => action(OrderActionTypes.CLEAR_ERRORS, type);
export const setBoss = (type: BossTypes, value: any) => action(OrderActionTypes.SET_BOSS, { type, value });
export const setRxInformation = (type: string, field: string, value: string) => action(OrderActionTypes.SET_RX_INFORMATION, { type, field, value });
export const setRecommendation = (recommendation: string) => action(OrderActionTypes.SET_RECOMMENDATION, recommendation);
export const setMessage = (message: string) => action(OrderActionTypes.SET_MESSAGE, message);
export const setFittingProperties = (properties: any) => action(OrderActionTypes.SET_FITTING_PROPERTIES, properties);
export const setBlueprint = (blueprint: Blueprint) => action(OrderActionTypes.SET_BLUEPRINT, blueprint);

export const savePrescription: any = (prescription: Prescription) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = savePrescriptionInformation(prescription);

    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    dispatch(closeRequest());
    
    if (response.success) {
      dispatch(lensesActions.fetchLenses());
    }
    else {
      dispatch(setErrors('prescription', response.errors));
    }
  })
};

export const saveFittingHeight: any = (order: IOrderState, height: number) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());
  dispatch(setBoss(BossTypes.FITTING_HEIGHT, height));

  return new Promise((resolver) => {
    const response = saveFittingHeightInformation(order, height);

    setTimeout(() => {
      resolver(response);
    }, 7000);
  })
  .then((response: any) => {
    dispatch(closeRequest());

    if (response.success) {
      dispatch(setBlueprint(response.result));
    }
  })
};

export const saveOrder: any = (order: IOrderState) => (dispatch: Dispatch) => {
  return new Promise((resolver) => {
    const response = saveOrderInformation(order);

    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    if (response.success) {
    }
  })
};

export const checkCompatibility: any = (order: IOrderState) => (dispatch: Dispatch) => {
  return new Promise((resolver) => {
    const response = checkFrameCompatibility(order);

    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    if (!response.success) {
      dispatch(setErrors(BossTypes.FRAME, response.result));
    }
  })
};

export const fetchLensCompatibility: any = (prescription: Prescription, lens: Lens) => (dispatch: Dispatch) => {
  return new Promise((resolver) => {
    const response = checkLensError(prescription, lens);

    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    if (!response.success) {
      dispatch(setBoss(BossTypes.LENS, {} as Lens));
      dispatch(lensesActions.setErrors(response.result));
    }
  })
};

export const fetchSubmitOrder: any = (order: IOrderState) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = saveOrderInformation(order);

    setTimeout(() => {
      resolver(response);
    }, 3000);
  })
  .then((response: any) => {
    dispatch(closeRequest());

    if (response.success) {
      dispatch(setBoss(BossTypes.BARCODE, response.result));
    }
  })
}; 
