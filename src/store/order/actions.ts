import { action } from 'typesafe-actions';
import { ApplicationState } from '../index';
import { OrderActionTypes, Prescription, Blueprint, BossTypes, Boss } from './types';

export const submitStart = (boss: Boss) => action(OrderActionTypes.SUBMIT_START, boss);
export const submitSuccess = () => action(OrderActionTypes.SUBMIT_SUCCESS);
export const submitFailed = (message: string) => action(OrderActionTypes.SUBMIT_FAILED, message);

export const saveOrderStart = (state: ApplicationState) => action(OrderActionTypes.SAVE_ORDER_START, state);
export const saveOrderSuccess = () => action(OrderActionTypes.SAVE_ORDER_SUCCESS);
export const saveOrderFailed = (message: string) => action(OrderActionTypes.SAVE_ORDER_FAILED, message);

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
// export const setBlueprint = (blueprint: Blueprint) => action(OrderActionTypes.SET_BLUEPRINT, blueprint);
export const disableRedirect = () => action(OrderActionTypes.DISABLE_REDIRECT);
export const setBoss = (type: BossTypes, value: any) => action(OrderActionTypes.SET_BOSS, { type, value });

// export const saveOrder: any = (order: IOrderState) => (dispatch: Dispatch) => {
//   return new Promise((resolver) => {
//     const response = saveOrderInformation(order);

//     setTimeout(() => {
//       resolver(response);
//     }, 1000);
//   })
//   .then((response: any) => {
//     if (response.success) {
//     }
//   })
// };

// export const checkCompatibility: any = (order: IOrderState) => (dispatch: Dispatch) => {
//   return new Promise((resolver) => {
//     const response = checkFrameCompatibility(order);

//     setTimeout(() => {
//       resolver(response);
//     }, 1000);
//   })
//   .then((response: any) => {
//     if (!response.success) {
//       dispatch(setErrors(BossTypes.FRAME, response.result));
//     }
//   })
// };

// export const fetchLensCompatibility: any = (prescription: Prescription, lens: Lens) => (dispatch: Dispatch) => {
//   return new Promise((resolver) => {
//     const response = checkLensError(prescription, lens);

//     setTimeout(() => {
//       resolver(response);
//     }, 1000);
//   })
//   .then((response: any) => {
//     if (!response.success) {
//       dispatch(setBoss(BossTypes.LENS, {} as Lens));
//       dispatch(lensesActions.setErrors(response.result));
//     }
//   })
// };
