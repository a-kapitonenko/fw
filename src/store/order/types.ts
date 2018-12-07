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
};

export const enum BossTypes {
  FITTING_HEIGHT = 'fittingHeight',
  FRAME = 'frame',
  LENS = 'lens',
  BARCODE = 'barcode',
}

export type Errors = {
  submit: string,
  prescription: string,
  fittingHeight: string,
};

export const enum ErrorTypes {
  SUBMIT = 'submit',
  PRESCRIPTION = 'prescription',
  FITTING_HEIGHT = 'fittingHeight',
}

export const enum OrderActionTypes {
  SUBMIT_START = '@@order/SUBMIT_START',
  SUBMIT_SUCCESS = '@@order/SUBMIT_SUCCESS',
  SUBMIT_FAILED = '@@order/SUBMIT_FAILED',

  SAVE_ORDER_START = '@@order/SAVE_ORDER_START',
  SAVE_ORDER_SUCCESS = '@@order/SAVE_ORDER_SUCCESS',
  SAVE_ORDER_FAILED = '@@order/SAVE_ORDER_FAILED',

  SAVE_PRESCRIPTION_START = '@@order/SAVE_PRESCRIPTION_START',
  SAVE_PRESCRIPTION_SUCCESS = '@@order/SAVE_PRESCRIPTION_SUCCESS',
  SAVE_PRESCRIPTION_FAILED = '@@order/SAVE_PRESCRIPTION_FAILED',

  SAVE_FITTING_HEIGHT_START = '@@order/SAVE_FITTING_HEIGHT_START',
  SAVE_FITTING_HEIGHT_SUCCESS = '@@order/SAVE_FITTING_HEIGHT_SUCCESS',
  SAVE_FITTING_HEIGHT_FAILED = '@@order/SAVE_FITTING_HEIGHT_FAILED',

  SET_RX_INFORMATION = '@@order/SET_RX_INFORMATION',
  SET_RECOMMENDATION = '@@order/SET_RECOMMENDATION',
  SET_MESSAGE = '@@order/SET_MESSAGE',
  SET_FITTING_PROPERTIES = '@@order/SET_FITTING_PROPERTIES',
  // SET_BLUEPRINT = '@@order/SET_BLUEPRINT',

  SET_BOSS = '@@order/SET_BOSS',
}

export interface IOrderState {
  readonly isFetching: boolean;
  readonly errors: Errors;
  readonly redirect: false;
  readonly fittingProperties: any;
  readonly recommendation: string;
  readonly message: string;
  readonly blueprint: Blueprint;
  readonly boss: Boss;
};
