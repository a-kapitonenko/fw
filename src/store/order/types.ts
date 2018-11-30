import { Frame } from '../frames/types';
import { Lens } from '../lenses/types';

export type OculusInfo = {
  sphere: string;
  cyclinder: string;
  axis: string;
  addition: string;
  PDDistance: string;
  PDNear: string;
  prism: string;
};

export type Prescription = {
  OD: OculusInfo;
  OS: OculusInfo;
};

export type Blueprint = {
  img: string;
};

export type Barcode = {
  img: string;
};

export type Boss = {
  prescription: Prescription;
  fittingHeight: number;
  frame: Frame;
  lens: Lens;
  barcode: Barcode;
}

export const enum OrderActionTypes {
  FETCH_REQUEST = '@@order/FETCH_REQUEST',
  FETCH_CLOSE = '@@order/FETCH_CLOSE',
  SET_BOSS = '@@order/SET_BOSS',
  SET_RX_INFORMATION = '@@order/SET_RX_INFORMATION',
  SET_RECOMMENDATION = '@@order/SET_RECOMMENDATION',
  SET_MESSAGE = '@@order/SET_MESSAGE',
  SET_FITTING_PROPERTIES = '@@order/SET_FITTING_PROPERTIES',
  SET_BLUEPRINT = '@@order/SET_BLUEPRINT',
  SET_ERRORS = '@@order/SET_ERRORS',
  DELETE_ERRORS = '@@order/DELETE_ERRORS'
};

export interface IOrderState {
  readonly isFetching: boolean;
  readonly errors: object;
  readonly boss: Boss;
  readonly fittingProperties: any;
  readonly recommendation: string;
  readonly message: string;
  readonly blueprint: Blueprint;
};
