import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { FramesActionTypes, Frame, ErrorTypes } from './types';
import { IOrderState, BossTypes, Boss } from '../order/types';
import * as OrderActions from '../order/actions';

import { getSimilarFrames, onSubmit } from '../../test/frames';

export const fetchRequest = () => action(FramesActionTypes.FETCH_REQUEST);
export const closeRequest = () => action(FramesActionTypes.CLOSE_REQUEST);
export const setError = (type: ErrorTypes, error: string) => action(FramesActionTypes.SET_ERROR, {type, error});
export const clearError = (type: ErrorTypes) => action(FramesActionTypes.CLEAR_ERROR, type);
export const open = () => action(FramesActionTypes.OPEN);
export const close = () => action(FramesActionTypes.CLOSE);
export const setStep = (step: number) => action(FramesActionTypes.SET_STEP, step);
export const setSelectedFrame = (frame: Frame) => action(FramesActionTypes.SET_SELECTED_FRAME, frame);
export const resetSelectedFrame = () => action(FramesActionTypes.RESET_SELECTED_FRAME);
export const setSimilarFrames = (frames: Frame[]) => action(FramesActionTypes.SET_SIMILAR_FRAMES, frames);
export const resetSimilarFrames = () => action(FramesActionTypes.RESET_SIMILAR_FRAMES);

export const fetchSimilarFrames: any = (boss: Boss) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = getSimilarFrames(boss);

    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    dispatch(closeRequest());

    if (response.success) {
      dispatch(setSimilarFrames(response.similarFrames));
    } else {
      dispatch(setError(ErrorTypes.SIMILAR_FRAMES, response.errors));
    }
  })
  .catch((errors: any) => dispatch(setError(ErrorTypes.SIMILAR_FRAMES, errors)))
};

export const fetchSubmit: any = (order: IOrderState, frame: Frame) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = onSubmit(order, frame);

    setTimeout(() => {
      resolver(response);
    }, 7000);
  })
  .then((response: any) => {
    dispatch(closeRequest());

    if (response.success) {
      dispatch(clearError(ErrorTypes.SUBMIT));
      dispatch(close());
      dispatch(setStep(1));
      dispatch(OrderActions.setBoss(BossTypes.FRAME, frame));
      dispatch(OrderActions.setMessage(response.result.message));
      dispatch(OrderActions.setFittingProperties(response.result.fittingHeight));
    } else {
      dispatch(setError(ErrorTypes.SUBMIT, response.errors));
    }
  })
  .catch((errors: any) => dispatch(setError(ErrorTypes.SUBMIT, errors)))
};
