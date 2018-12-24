import { action } from 'typesafe-actions';
import { ApplicationState } from '../index';
import { OrderActionTypes, Prescription, Blueprint, BossTypes, Boss } from './types';

export const submitStart = (boss: Boss) => action(OrderActionTypes.SUBMIT_START, boss);
export const submitSuccess = () => action(OrderActionTypes.SUBMIT_SUCCESS);
export const submitFailed = (message: string) => action(OrderActionTypes.SUBMIT_FAILED, message);

export const saveOrderStart = (state: ApplicationState) => action(OrderActionTypes.SAVE_ORDER_START, state);
export const saveOrderSuccess = () => action(OrderActionTypes.SAVE_ORDER_SUCCESS);
export const saveOrderFailed = (message: string) => action(OrderActionTypes.SAVE_ORDER_FAILED, message);

export const fetchOrderValuesStart = (id: string) => action(OrderActionTypes.FETCH_ORDER_VALUES_START, id);
export const fetchOrderValuesSuccess = (values: any) => action(OrderActionTypes.FETCH_ORDER_VALUES_SUCCESS, values);
export const fetchOrderValuesFailed = (message: string) => action(OrderActionTypes.FETCH_ORDER_VALUES_FAILED, message);

export const savePrescriptionStart = (prescription: Prescription) => action(OrderActionTypes.SAVE_PRESCRIPTION_START, prescription);
export const savePrescriptionSuccess = () => action(OrderActionTypes.SAVE_PRESCRIPTION_SUCCESS);
export const savePrescriptionFailed = (message: string) => action(OrderActionTypes.SAVE_PRESCRIPTION_FAILED, message);

export const saveFittingHeightStart = (boss: Boss, height: number) => action(OrderActionTypes.SAVE_FITTING_HEIGHT_START, { boss, height });
export const saveFittingHeightSuccess = (blueprint: Blueprint) => action(OrderActionTypes.SAVE_FITTING_HEIGHT_SUCCESS, blueprint);
export const saveFittingHeightFailed = (message: string) => action(OrderActionTypes.SAVE_FITTING_HEIGHT_FAILED, message);

export const setRxInformation = (type: string, field: string, value: string) => action(OrderActionTypes.SET_RX_INFORMATION, { type, field, value });
export const setRecommendation = (recommendation: string) => action(OrderActionTypes.SET_RECOMMENDATION, recommendation);
export const setMessage = (message: string) => action(OrderActionTypes.SET_MESSAGE, message);
export const setFittingProperties = (properties: any) => action(OrderActionTypes.SET_FITTING_PROPERTIES, properties);
export const setBoss = (type: BossTypes, value: any) => action(OrderActionTypes.SET_BOSS, { type, value });
export const disableRedirect = () => action(OrderActionTypes.DISABLE_REDIRECT);
