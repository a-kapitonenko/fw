import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { SearchActionTypes } from './types';
import { IOrderState } from '../order/types';
import { Frame } from '../frames/types';

import { getFramesByUpc } from '../../test/frames';

export const fetchRequest = () => action(SearchActionTypes.FETCH_REQUEST);
export const fetchSuccess = (frames: Frame[]) => action(SearchActionTypes.FETCH_SUCCESS, frames);
export const fetchError = (message: string) => action(SearchActionTypes.FETCH_ERROR, message);
export const setSelectedFrames = (frames: Frame[]) => action(SearchActionTypes.SET_SELECTED_FRAMES, frames);

export const fetchFrames: any = (order: IOrderState, upc: string) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());
  
  return new Promise((resolver) => {
    const response = getFramesByUpc(order, upc);
    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    if (response.success) {
      console.log(response.result)
      dispatch(fetchSuccess(response.result));
    }
  })
};
