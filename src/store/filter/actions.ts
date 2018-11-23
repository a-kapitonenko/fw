import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';

import { FilterActionTypes, Groups } from './types';
import { IOrderState } from '../order/types';
import { Frame } from '../frames/types';

import { createFilterGroupsData } from '../../helpers/filterHelper';

import { getFilterGroups, getFilterFrames } from '../../test/frames';

export const fetchRequest = () => action(FilterActionTypes.FETCH_REQUEST);
export const fetchSuccess = (groups: Groups) => action(FilterActionTypes.FETCH_SUCCESS, groups);
export const fetchError = (message: string) => action(FilterActionTypes.FETCH_ERROR, message);
export const changeChecked = (type: string, name: string, value: boolean) => action(FilterActionTypes.CHANGE_CHECKED, { type, name, value });
export const addQuery = (type: string, value: any) => action(FilterActionTypes.ADD_QUERY, { type, name, value });
export const deleteQuery = (type: string, value: any) => action(FilterActionTypes.DELETE_QUERY, { type, name, value });
export const resetQuery = () => action(FilterActionTypes.RESET_QUERY);
export const setFrames = (frames: Frame[]) => action(FilterActionTypes.SET_FRAMES, frames);

export const fetchFilterGroups: any = (order: IOrderState) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = getFilterGroups(order);

    resolver(response);
  })
  .then((response: any) => {
    if (response.success) {
      const groups = createFilterGroupsData(response.result);

      dispatch(fetchSuccess(groups));
    }
  })
};

export const fetchFrames: any = (order: IOrderState, query: Object) => (dispatch: Dispatch) => {
  dispatch(fetchRequest());

  return new Promise((resolver) => {
    const response = getFilterFrames(order, query);

    resolver(response);
  })
  .then((response: any) => {
    if (response.success) {
      dispatch(setFrames(response.frames));
    }
  })
};