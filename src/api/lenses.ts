import request from './request';
import { Prescription, } from '../store/order/types';
import { Lens } from '../store/lenses/types';
import { saveLens, getLenses } from '../test/lenses';
import { checkLensError as checkLens } from '../test/lenses';
//import { checkLens } from '../test/lenses';

export const fetchLensesRequest = (data: Prescription) => {
  return request(getLenses, data);
};

export const saveLensRequest = (
  data: {
    prescription: Prescription,
    lens: Lens,
  }
) => {
  return request(saveLens, data);
};

export const checkLensRequest = (
  data: {
    prescription: Prescription,
    lens: Lens,
  }
) => {
  return request(checkLens, data);
};
