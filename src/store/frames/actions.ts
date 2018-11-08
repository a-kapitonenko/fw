import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { FramesActionTypes, Frame, SelectedFrame } from './types';

import { frames, checkFrames } from '../../test/frames';

export const fetchRequest = () => action(FramesActionTypes.FETCH_REQUEST);
export const fetchSuccess = (list: Frame[]) => action(FramesActionTypes.FETCH_SUCCESS, list);
export const fetchError = (message: string) => action(FramesActionTypes.FETCH_ERROR, message);

export const fetchFrames: any = () => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    resolver(frames)
  })
  .then((frames: any) => {
    dispatch(fetchSuccess(frames));
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
