import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { fetchLenses } from '../lenses/actions';
import { OrderActionTypes, Prescription, IOrderState } from './types';
import { Lens } from '../lenses/types';
import { Frame } from '../frames/types';

import { savePrescriptionInformation, saveOrderInformation } from '../../test/order';

export const setRxInformation = (type: string, field: string, value: string) => action(OrderActionTypes.SET_RX_INFORMATION, { type, field, value });
export const setRecommendation = (recommendation: string) => action(OrderActionTypes.SET_RECOMMENDATION, recommendation);
export const setLens = (lens: Lens) => action(OrderActionTypes.SET_LENS, lens);
export const setFrame = (frame: Frame) => action(OrderActionTypes.SET_FRAME, frame);
export const setMessage = (message: string) => action(OrderActionTypes.SET_MESSAGE, message);
export const setFittingProperties = (properties: any) => action(OrderActionTypes.SET_FITTING_PROPERTIES, properties);
export const setFittingHeight = (height: any) => action(OrderActionTypes.SET_FITTING_HEIGHT, height);
export const setErrors = (type: string, error: string) => action(OrderActionTypes.SET_ERRORS, {type, error});

export const savePrescription: any = (prescription: Prescription) => (dispatch: Dispatch) => {
  return new Promise((resolver) => {
    const response = savePrescriptionInformation(prescription);

    resolver(response)
  })
  .then((response: any) => {
    if (response.success) {
      dispatch(setRecommendation(response.recommendation));
      dispatch(fetchLenses());
    }
  })
};

export const saveOrder: any = (order: IOrderState) => (dispatch: Dispatch) => {
  return new Promise((resolver) => {
    const response = saveOrderInformation(order);

    resolver(response)
  })
  .then((response: any) => {
    if (response.success) {
    }
  })
};
