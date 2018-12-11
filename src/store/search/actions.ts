import { action } from 'typesafe-actions';
import { SearchActionTypes } from './types';
import { Boss } from '../order/types';
import { Frame } from '../frames/types';

export const searchStart = (boss: Boss, upc: string) => action(SearchActionTypes.SEARCH_START, { boss, upc });
export const searchFailed = (message: string) => action(SearchActionTypes.SEARCH_FAILED, message);
export const searchSuccess = (frames: Frame[]) => action(SearchActionTypes.SEARCH_SUCCESS, frames);

export const setSelectedFrames = (frames: Frame[]) => action(SearchActionTypes.SET_SELECTED_FRAMES, frames);
export const clearResult = () => action(SearchActionTypes.CLEAR_RESULT);
