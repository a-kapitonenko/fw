import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { FramesActionTypes, Frame } from './types';

import { frames } from '../../test/frames';

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
}