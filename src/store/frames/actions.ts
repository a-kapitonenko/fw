import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { FramesActionTypes, Frame, SelectedFrame } from './types';
import { IOrderState } from '../order/types';

import { getFrames, checkFrames, getSimilarFrames, getFramesByUpc } from '../../test/frames';

export const open = () => action(FramesActionTypes.OPEN);
export const close = () => action(FramesActionTypes.CLOSE);

export const fetchRequest = () => action(FramesActionTypes.FETCH_REQUEST);
export const fetchSuccess = (list: Frame[]) => action(FramesActionTypes.FETCH_SUCCESS, list);
export const fetchError = (message: string) => action(FramesActionTypes.FETCH_ERROR, message);

export const fetchFrames: any = (order: IOrderState) => (dispatch: Dispatch) => {
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

export const fetchSimilarFrames: any = (order: IOrderState) => (dispatch: Dispatch) => {
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

export const fetchUpc = () => action(FramesActionTypes.FETCH_UPC);
export const fetchUpcError = (message: string) => action(FramesActionTypes.FETCH_UPC_ERROR, message);
export const fetchUpcSuccess  = (frames: Frame[]) => action(FramesActionTypes.FETCH_UPC_SUCCESS, frames);

export const fetchFramesByUPC: any = (order: IOrderState, upc: string) => (dispatch: Dispatch) => {
  dispatch(fetchUpc());
  
  return new Promise((resolver) => {
    const response = getFramesByUpc(order, upc);
    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    if (response.success) {
      dispatch(fetchUpcSuccess(response.result));
    }
  })
};

export const setUpcSelected = (frames: Frame[]) => action(FramesActionTypes.SET_UPC_SELECTED, frames);
export const setUpcSelectedFrame = (frame: Frame) => action(FramesActionTypes.SET_UPC_SELECTED_FRAME, frame);
