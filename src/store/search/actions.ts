import { action } from 'typesafe-actions';
import { SearchActionTypes } from './types';
import { Boss } from '../order/types';
import { Frame } from '../frames/types';

export const fetchRequest = () => action(SearchActionTypes.FETCH_REQUEST);
export const closeRequest = () => action(SearchActionTypes.CLOSE_REQUEST);
export const setErrors = (errors: string) => action(SearchActionTypes.SET_ERRORS, errors);
export const clearErrors = () => action(SearchActionTypes.CLEAR_ERRORS);
export const fetchFrames = (boss: Boss, upc: string) => action(SearchActionTypes.FETCH_FRAMES, { boss, upc });
export const setFrames = (frames: Frame[]) => action(SearchActionTypes.SET_FRAMES, frames); 
export const setSelectedFrames = (frames: Frame[]) => action(SearchActionTypes.SET_SELECTED_FRAMES, frames);
