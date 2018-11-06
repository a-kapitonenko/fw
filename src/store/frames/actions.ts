import { action } from 'typesafe-actions';
import { FramesActionTypes, Frame } from './types';

export const fetchRequest = () => action(FramesActionTypes.FETCH_REQUEST);
export const fetchSuccess = (list: Frame[]) => action(FramesActionTypes.FETCH_SUCCESS, list);
export const fetchError = (message: string) => action(FramesActionTypes.FETCH_ERROR, message);
