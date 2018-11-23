import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { FramesActionTypes, Frame } from './types';
import { IOrderState } from '../order/types';

import { getSimilarFrames } from '../../test/frames';

export const fetchRequest = () => action(FramesActionTypes.FETCH_REQUEST);
export const fetchSuccess = (similarFrames: Frame[]) => action(FramesActionTypes.FETCH_SUCCESS, similarFrames);
export const fetchError = (message: string) => action(FramesActionTypes.FETCH_ERROR, message);
export const open = () => action(FramesActionTypes.OPEN);
export const close = () => action(FramesActionTypes.CLOSE);
export const setStep = (step: number) => action(FramesActionTypes.SET_STEP);
export const setSelectedFrame = (frame: Frame) => action(FramesActionTypes.SET_SELECTED_FRAME, frame);

export const fetchSimilarFrames: any = (order: IOrderState) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = getSimilarFrames(order);

    resolver(response);
  })
  .then((response: any) => {
    if (response.success) {
      dispatch(fetchSuccess(response.similarFrames));
    }
  })
};
