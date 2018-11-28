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
}

export const enum OrderActionTypes {
  SET_RX_INFORMATION = '@@order/SET_RX_INFORMATION',
  SET_RECOMMENDATION = '@@order/SET_RECOMMENDATION',
  SET_LENS = '@@order/SET_LENS',
  SET_FRAME = '@@order/SET_FRAME',
  SET_MESSAGE = '@@order/SET_MESSAGE',
  SET_FITTING_PROPERTIES = '@@order/SET_FITTING_PROPERTIES',
  SET_FITTING_HEIGHT = '@@order/SET_FITTING_HEIGHT',
  SET_BLUEPRINT = '@@order/SET_BLUEPRINT',
  SET_BARCODE = '@@order/SET_BARCODE',
  SET_ERRORS = '@@order/SET_ERRORS',
  DELETE_ERRORS = '@@order/DELETE_ERRORS'
};

export interface IOrderState {
  readonly prescription: Prescription;
  readonly frame: Frame;
  readonly fittingHeight: number;
  readonly fittingProperties: any;
  readonly lens: Lens;
  readonly recommendation: string;
  readonly message: string;
  readonly blueprint: Blueprint;
  readonly barcode: Barcode;
  readonly errors: object;
};
