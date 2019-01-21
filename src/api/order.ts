import request from './request';
import { Boss, Prescription,  } from '../store/order/types';
import * as orderTest from '../test/order';

export const submitRequest = (data: Boss) => {
  return request(orderTest.saveOrderInformation, data);
};

export const saveOrderRequest = (data: any) => {
  return request(orderTest.saveOrder, data);
};

export const fetchOrderValuesRequest = (data: string) => {
  return request(orderTest.loadOrderValues, data);
};

export const savePrescriptionRequest = (data: Prescription) => {
  return request(orderTest.savePrescription, data);
};

export const saveFittingHeightRequest = (
  data: {
    boss: Boss,
    height: number,
  }
) => {
  return request(orderTest.saveFittingHeight, data);
};
