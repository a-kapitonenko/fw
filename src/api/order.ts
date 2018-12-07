import request from './request';
import { ApplicationState } from '../store';
import { Boss, Prescription,  } from '../store/order/types';
import { Lens } from '../store/lenses/types';
import { getLenses } from '../test/lenses';
import { saveOrderInformation, saveOrder, savePrescription, saveLens, saveFittingHeight } from '../test/order';

export const submitRequest = (data: Boss) => request(saveOrderInformation, data);
export const saveOrderRequest = (data: ApplicationState) => request(saveOrder, data);
export const savePrescriptionRequest = (data: Prescription) => request(savePrescription, data)
export const fetchLensesRequest = (data: Prescription) => request(getLenses, data);
export const saveLensRequest = (data: { prescription: Prescription, lens: Lens }) => request(saveLens, data);
export const saveFittingHeightRequest = (data: { boss: Boss, height: number }) => request(saveFittingHeight, data);
