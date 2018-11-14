import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { OrderActionTypes, OrderState } from './types';
import { Lens } from '../lenses/types';
import { Frame } from '../frames/types';

import { savePrescriptionInformation } from '../../test/order';

export const setRecommendation = (recommendation: string) => action(OrderActionTypes.SET_RECOMMENDATION, recommendation);
export const setPrescription = (prescription: any) => action(OrderActionTypes.SET_PRESCRIPTION, prescription);
export const setLens = (lens: Lens) => action(OrderActionTypes.SET_LENS, lens);
export const setFrame = (frame: Frame) => action(OrderActionTypes.SET_FRAME, frame);

export const savePrescription: any = (values: OrderState) => (dispatch: Dispatch) => {
  return new Promise((resolver) => {
    const response = savePrescriptionInformation(values);

    resolver(response)
  })
  .then((response: any) => {
    if (response.success) {
      dispatch(setPrescription(values.prescription));
      dispatch(setRecommendation(response.recommendation));
    }
  })
};