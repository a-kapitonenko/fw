import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { FramesActionTypes, Frame, SelectedFrame } from './types';
import { OrderState } from '../order/types';

import { getFrames, checkFrames, getSimilarFrames } from '../../test/frames';

export const fetchRequest = () => action(FramesActionTypes.FETCH_REQUEST);
export const fetchSuccess = (list: Frame[]) => action(FramesActionTypes.FETCH_SUCCESS, list);
export const fetchError = (message: string) => action(FramesActionTypes.FETCH_ERROR, message);

export const fetchFrames: any = (order: OrderState) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = getFrames(order);

    resolver(response);
  })
  .then((response: any) => {
    if (response.success) {
      dispatch(fetchSuccess(response.frames));
    } 
  })
};

export const fetchSimilarFrames: any = (order: OrderState) => (dispatch: Dispatch) => {
  return new Promise((resolver) => {
    const response = getSimilarFrames(order);

    resolver(response);
  })
  .then((response: any) => {
    if (response.success) {
      dispatch(setSimilarFrames(response.similarFrames));
    }
  })
};

export const addSelected = (frame: SelectedFrame) => action(FramesActionTypes.ADD_SELECTED, frame);
export const setSelected = (frames: SelectedFrame[]) => action(FramesActionTypes.SET_SELECTED, frames);
export const deleteSelected = (frame: SelectedFrame) => action(FramesActionTypes.DELETE_SELECTED, frame);

export const fetchCheck: any = (frames: SelectedFrame[]) => (dispatch: Dispatch) => {
  return new Promise((resolver) => {
    const selectedFrames = checkFrames(frames);
    
    dispatch(setSelected(selectedFrames));
  })
};

export const setSelectedFrame = (frame: Frame) => action(FramesActionTypes.SET_SELECTED_FRAME, frame);
export const setSimilarFrames = (frames: Frame[]) => action(FramesActionTypes.SET_SIMILAR_FRAMES, frames);
