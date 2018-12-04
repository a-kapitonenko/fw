import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { SearchActionTypes } from './types';
import { Boss } from '../order/types';
import { Frame } from '../frames/types';

import { getFramesByUpc } from '../../test/frames';

export const fetchRequest = () => action(SearchActionTypes.FETCH_REQUEST);
export const closeRequest = () => action(SearchActionTypes.CLOSE_REQUEST);
export const setErrors = (errors: string) => action(SearchActionTypes.SET_ERRORS, errors);
export const clearErrors = () => action(SearchActionTypes.CLEAR_ERRORS);
export const setFrames = (frames: Frame[]) => action(SearchActionTypes.SET_FRAMES, frames); 
export const setSelectedFrames = (frames: Frame[]) => action(SearchActionTypes.SET_SELECTED_FRAMES, frames);

export const fetchFrames: any = (boss: Boss, upc: string) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());
  
  return new Promise((resolver) => {
    const response = getFramesByUpc(boss, upc);
    
    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    dispatch(closeRequest());

    if (response.success) {
      dispatch(setFrames(response.result));
    } else {
      dispatch(setErrors(response.errors));
    }
  })
  .catch((errors: any) => dispatch(setErrors(errors)))
};
