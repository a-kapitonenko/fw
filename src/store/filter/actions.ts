import { action } from 'typesafe-actions';
import { FilterActionTypes, Groups } from './types';
import { Boss } from '../order/types';
import { Frame } from '../frames/types';

export const filteringStart = (boss: Boss, query: object) => action(FilterActionTypes.FILTERING_START, { boss, query });
export const filteringSuccess = (frames: Frame[]) => action(FilterActionTypes.FILTERING_SUCCESS, frames);
export const filteringFailed = (message: string) => action(FilterActionTypes.FILTERING_FAILED, message);

export const fetchGroupsStart = () => action(FilterActionTypes.FETCH_GROUPS_START);
export const fetchGroupsSuccess = (groups: Groups) => action(FilterActionTypes.FETCH_GROUPS_SUCCESS, groups);
export const fetchGroupsFailed = (message: string) => action(FilterActionTypes.FETCH_GROUPS_FAILED, message);

export const changeChecked = (type: string, name: string, value: boolean) => action(FilterActionTypes.CHANGE_CHECKED, { type, name, value });
export const clearChecked = () => action(FilterActionTypes.CLEAR_CHECKED);
export const addQuery = (type: string, value: any) => action(FilterActionTypes.ADD_QUERY, { type, value });
export const deleteQuery = (type: string, value: any) => action(FilterActionTypes.DELETE_QUERY, { type, value });
export const clearQuery = () => action(FilterActionTypes.CLEAR_QUERY);
export const clearResult = () => action(FilterActionTypes.CLEAR_RESULT);
