import request from './request';
import { ApplicationState } from '../store';
import { Boss, Prescription,  } from '../store/order/types';
import { saveOrderInformation, saveOrder, savePrescription, saveFittingHeight } from '../test/order';

export const submitRequest = (data: Boss) => request(saveOrderInformation, data);
export const saveOrderRequest = (data: ApplicationState) => request(saveOrder, data);
export const savePrescriptionRequest = (data: Prescription) => request(savePrescription, data)
export const saveFittingHeightRequest = (data: { boss: Boss, height: number }) => request(saveFittingHeight, data);
