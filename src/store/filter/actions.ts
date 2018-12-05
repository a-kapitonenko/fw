import { action } from 'typesafe-actions';
import { FilterActionTypes, Groups } from './types';
import { Boss } from '../order/types';
import { Frame } from '../frames/types';

export const fetchRequest = () => action(FilterActionTypes.FETCH_REQUEST);
export const closeRequest = () => action(FilterActionTypes.CLOSE_REQUEST);
export const setErrors = (errors: string) => action(FilterActionTypes.SET_ERRORS, errors);
export const clearErrors = () => action(FilterActionTypes.CLEAR_ERRORS);
export const fetchFilterGroups = () => action(FilterActionTypes.FETCH_GROUPS);
export const fetchFrames = (boss: Boss, query: object) => action(FilterActionTypes.FETCH_FRAMES, { boss, query });
export const setGroups = (groups: Groups) => action(FilterActionTypes.SET_GROUPS, groups)
export const setFrames = (frames: Frame[]) => action(FilterActionTypes.SET_FRAMES, frames);
export const changeChecked = (type: string, name: string, value: boolean) => action(FilterActionTypes.CHANGE_CHECKED, { type, name, value });
export const resetChecked = () => action(FilterActionTypes.RESET_CHECKED);
export const addQuery = (type: string, value: any) => action(FilterActionTypes.ADD_QUERY, { type, value });
export const deleteQuery = (type: string, value: any) => action(FilterActionTypes.DELETE_QUERY, { type, value });
export const clearQuery = () => action(FilterActionTypes.CLEAR_QUERY);
