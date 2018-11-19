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

export const enum OrderActionTypes {
  SET_RX_INFORMATION = '@@order/SET_RX_INFORMATION',
  SET_RECOMMENDATION = '@@order/SET_RECOMMENDATION',
  SET_LENS = '@@order/SET_LENS',
  SET_FRAME = '@@order/SET_FRAME',
};

export interface IOrderState {
  readonly prescription: Prescription;
  readonly frame: Frame;
  readonly fittingHeight: number;
  readonly lens: Lens;
  readonly recommendation: string;
};
