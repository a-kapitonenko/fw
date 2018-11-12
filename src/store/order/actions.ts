import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { OrderActionTypes } from './types';
import { Lens } from '../lenses/types';
import { Frame } from '../frames/types';

export const setRecommendation = (recommendation: string) => action(OrderActionTypes.SET_RECOMMENDATION, recommendation);
export const setRxInformation = (type: string, field: string, value: string) => action(OrderActionTypes.SET_RX_INFORMATION, { type, field, value });
export const setLens = (lens: Lens) => action(OrderActionTypes.SET_LENS, lens);
export const setFrame = (frame: Frame) => action(OrderActionTypes.SET_FRAME, frame);

export const savePrescription: any = (order: any) => (dispatch: Dispatch) => {
  
};