import { action } from 'typesafe-actions';
import { LensesActionTypes, Lens } from './types';
import { Prescription } from '../order/types';

export const fetchLensesStart = (prescription: Prescription) => action(LensesActionTypes.FETCH_LENSES_START, prescription);
export const fetchLensesSuccess = (lenses: Lens[]) => action(LensesActionTypes.FETCH_LENSES_SUCCESS, lenses);
export const fetchLensesFailed = (message: string) => action(LensesActionTypes.FETCH_LENSES_FAILED, message);

export const saveLensStart = (prescription: Prescription, lens: Lens) => action(LensesActionTypes.SAVE_LENS_START, { prescription, lens });
export const saveLensSuccess = () => action(LensesActionTypes.SAVE_LENS_SUCCESS);
export const saveLensFailed = (message: string) => action(LensesActionTypes.SAVE_LENS_FAILED, message);
