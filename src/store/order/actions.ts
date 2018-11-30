import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import * as lensesActions from '../lenses/actions';
import { OrderActionTypes, Prescription, IOrderState, Blueprint } from './types';
import { Lens } from '../lenses/types';

import { 
  savePrescriptionInformation, 
  saveOrderInformation, 
  checkFrameCompatibility, 
  saveFittingHeightInformation, 
  checkLensError,
  saveLensInformation, 
} from '../../test/order';

export const fetchRequest = () => action(OrderActionTypes.FETCH_REQUEST);
export const fetchClose = () => action(OrderActionTypes.FETCH_CLOSE);
export const setBoss = (type: string, value: any) => action(OrderActionTypes.SET_BOSS, { type, value });
export const setRxInformation = (type: string, field: string, value: string) => action(OrderActionTypes.SET_RX_INFORMATION, { type, field, value });
export const setRecommendation = (recommendation: string) => action(OrderActionTypes.SET_RECOMMENDATION, recommendation);
export const setMessage = (message: string) => action(OrderActionTypes.SET_MESSAGE, message);
export const setFittingProperties = (properties: any) => action(OrderActionTypes.SET_FITTING_PROPERTIES, properties);
export const setBlueprint = (blueprint: Blueprint) => action(OrderActionTypes.SET_BLUEPRINT, blueprint);
export const setErrors = (type: string, error: string) => action(OrderActionTypes.SET_ERRORS, { type, error });
export const deleteErrors = (type: string) => action(OrderActionTypes.DELETE_ERRORS, type);

export const savePrescription: any = (prescription: Prescription) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = savePrescriptionInformation(prescription);

    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    if (response.success) {
      dispatch(lensesActions.fetchLenses());
    }

    dispatch(fetchClose());
  })
};

export const saveLens: any = (prescription: Prescription, lens: Lens) => (dispatch: Dispatch) => {
  dispatch(setBoss('lens', lens));

  return new Promise((resolver) => {
    const response = saveLensInformation(prescription, lens)

    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    if (response.success) {
      dispatch(setRecommendation(response.recommendation));
    }
  })
};

export const saveFittingHeight: any = (order: IOrderState, height: number) => (dispatch: Dispatch) => {
  dispatch(setBoss('fittingHeight', height));

  return new Promise((resolver) => {
    const response = saveFittingHeightInformation(order, height);

    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
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
      dispatch(setErrors('frame', response.result));
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
      dispatch(setBoss('lens', {} as Lens));
      dispatch(lensesActions.setError(response.result));
    }
  })
};

export const submitOrder: any = (order: IOrderState) => (dispatch: Dispatch) => {
  return new Promise((resolver) => {
    const response = saveOrderInformation(order);

    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    if (response.success) {
      dispatch(setBoss('barcode', response.result));
    }
  })
}; 
