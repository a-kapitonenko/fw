import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { fetchLenses } from '../lenses/actions';
import { OrderActionTypes, Prescription, IOrderState, Blueprint, Barcode } from './types';
import { Lens } from '../lenses/types';
import { Frame } from '../frames/types';

import { savePrescriptionInformation, saveOrderInformation, checkFrameCompatibility, saveFittingHeightInformation } from '../../test/order';

export const setRxInformation = (type: string, field: string, value: string) => action(OrderActionTypes.SET_RX_INFORMATION, { type, field, value });
export const setRecommendation = (recommendation: string) => action(OrderActionTypes.SET_RECOMMENDATION, recommendation);
export const setLens = (lens: Lens) => action(OrderActionTypes.SET_LENS, lens);
export const setFrame = (frame: Frame) => action(OrderActionTypes.SET_FRAME, frame);
export const setMessage = (message: string) => action(OrderActionTypes.SET_MESSAGE, message);
export const setFittingProperties = (properties: any) => action(OrderActionTypes.SET_FITTING_PROPERTIES, properties);
export const setFittingHeight = (height: number) => action(OrderActionTypes.SET_FITTING_HEIGHT, height);
export const setBlueprint = (blueprint: Blueprint) => action(OrderActionTypes.SET_BLUEPRINT, blueprint);
export const setBarcode = (barcode: Barcode) => action(OrderActionTypes.SET_BARCODE, barcode);
export const setErrors = (type: string, error: string) => action(OrderActionTypes.SET_ERRORS, { type, error });
export const deleteErrors = (type: string) => action(OrderActionTypes.DELETE_ERRORS, type);

export const savePrescription: any = (prescription: Prescription) => (dispatch: Dispatch) => {
  return new Promise((resolver) => {
    const response = savePrescriptionInformation(prescription);

    resolver(response);
  })
  .then((response: any) => {
    if (response.success) {
      dispatch(setRecommendation(response.recommendation));
      dispatch(fetchLenses());
    }
  })
};

export const saveFittingHeight: any = (order: IOrderState, height: number) => (dispatch: Dispatch) => {
  return new Promise((resolver) => {
    const response = saveFittingHeightInformation(order, height);

    resolver(response);
  })
  .then((response: any) => {
    if (response.success) {
      dispatch(setFittingHeight(height));
      dispatch(setBlueprint(response.result));
    }
  })
};

export const saveOrder: any = (order: IOrderState) => (dispatch: Dispatch) => {
  return new Promise((resolver) => {
    const response = saveOrderInformation(order);

    resolver(response);
  })
  .then((response: any) => {
    if (response.success) {
    }
  })
};

export const checkCompatibility: any = (order: IOrderState) => (dispatch: Dispatch) => {
  return new Promise((resolver) => {
    const response = checkFrameCompatibility(order);

    resolver(response)
  })
  .then((response: any) => {
    if (!response.success) {
      dispatch(setErrors('frame', response.result));
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
      dispatch(setBarcode(response.result));
    }
  })
}; 
