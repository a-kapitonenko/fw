// import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { OrderActionTypes } from './types';
import { Lens } from '../lenses/types';
import { Frame } from '../frames/types';

export const setRecommendation = (recommendation: string) => action(OrderActionTypes.SET_RECOMMENDATION, recommendation);
export const setRxInformation = () => action(OrderActionTypes.SET_RX_INFORMATION);
export const setLens = (lens: Lens) => action(OrderActionTypes.SET_LENS, lens);
export const setFrame = (frame: Frame) => action(OrderActionTypes.SET_FRAME, frame);
