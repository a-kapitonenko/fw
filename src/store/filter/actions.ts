import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { FilterActionTypes, Groups } from './types';
import { Boss } from '../order/types';
import { Frame } from '../frames/types';

import { createFilterGroupsData } from '../../helpers/filterHelper';

import { getFilterGroups, getFilterFrames } from '../../test/frames';

export const fetchRequest = () => action(FilterActionTypes.FETCH_REQUEST);
export const closeRequest = () => action(FilterActionTypes.CLOSE_REQUEST);
export const setErrors = (errors: string) => action(FilterActionTypes.SET_ERRORS, errors);
export const clearErrors = () => action(FilterActionTypes.CLEAR_ERRORS);
export const setGroups = (groups: Groups) => action(FilterActionTypes.SET_GROUPS, groups)
export const setFrames = (frames: Frame[]) => action(FilterActionTypes.SET_FRAMES, frames);
export const changeChecked = (type: string, name: string, value: boolean) => action(FilterActionTypes.CHANGE_CHECKED, { type, name, value });
export const resetChecked = () => action(FilterActionTypes.RESET_CHECKED);
export const addQuery = (type: string, value: any) => action(FilterActionTypes.ADD_QUERY, { type, value });
export const deleteQuery = (type: string, value: any) => action(FilterActionTypes.DELETE_QUERY, { type, value });
export const clearQuery = () => action(FilterActionTypes.CLEAR_QUERY);

export const fetchFilterGroups: any = () => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = getFilterGroups();

    setTimeout(() => {
      resolver(response);
    }, 1000);
  })
  .then((response: any) => {
    dispatch(closeRequest());

    if (response.success) {
      const groups = createFilterGroupsData(response.result);

      dispatch(setGroups(groups));
    } else {
      dispatch(setErrors(response.errors));
    }
  })
  .catch((errors: any) => dispatch(setErrors(errors)))
};

export const fetchFrames: any = (boss: Boss, query: Object) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = getFilterFrames(boss, query);

    setTimeout(() => {
      resolver(response);
    }, 7000);
  })
  .then((response: any) => {
    dispatch(closeRequest());

    if (response.success) {
      dispatch(clearErrors());
      dispatch(setFrames(response.frames));
    } else {
      dispatch(setErrors(response.errors));
    }
  })
  .catch((errors: any) => dispatch(setErrors(errors)))
};