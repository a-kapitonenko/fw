import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { FramesActionTypes, Frame } from './types';
import { IOrderState, BossTypes } from '../order/types';
import * as OrderActions from '../order/actions';

import { getSimilarFrames, onSubmit } from '../../test/frames';

export const fetchRequest = () => action(FramesActionTypes.FETCH_REQUEST);
export const closeRequest = () => action(FramesActionTypes.CLOSE_REQUEST);
export const setErrors = (errors: string) => action(FramesActionTypes.SET_ERRORS, errors);
export const clearErrors = () => action(FramesActionTypes.CLEAR_ERRORS);
export const open = () => action(FramesActionTypes.OPEN);
export const close = () => action(FramesActionTypes.CLOSE);
export const setStep = (step: number) => action(FramesActionTypes.SET_STEP, step);
export const setSelectedFrame = (frame: Frame) => action(FramesActionTypes.SET_SELECTED_FRAME, frame);
export const resetSelectedFrame = () => action(FramesActionTypes.RESET_SELECTED_FRAME);
export const setSimilarFrames = (frames: Frame[]) => action(FramesActionTypes.SET_SIMILAR_FRAMES, frames);
export const resetSimilarFrames = () => action(FramesActionTypes.RESET_SIMILAR_FRAMES);

export const fetchSimilarFrames: any = (order: IOrderState) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = getSimilarFrames(order);

    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    dispatch(closeRequest());

    if (response.success) {
      dispatch(setSimilarFrames(response.similarFrames));
    } else {
      dispatch(setErrors(response.errors));
    }
  })
  .catch((errors: any) => dispatch(setErrors(errors)))
};

export const fetchSubmit: any = (order: IOrderState, frame: Frame) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = onSubmit(order, frame);

    resolver(response);
  })
  .then((response: any) => {
    dispatch(closeRequest());

    if (response.success) {
      dispatch(close());
      dispatch(setStep(1));
      dispatch(OrderActions.setBoss(BossTypes.FRAME, frame));
      dispatch(OrderActions.setMessage(response.result.message));
      dispatch(OrderActions.setFittingProperties(response.result.fittingHeight));
    } else {
      dispatch(setErrors(response.errors));
    }
  })
  .catch((errors: any) => dispatch(setErrors(errors)))
};
