import { Frame } from '../frames/types';
import { Lens } from '../lenses/types';

export interface Rx {
  sphere: string;
  cyclinder: string;
  axis: string;
  addition: string;
  PDDistance: string;
  PDNear: string;
  prism: string;
}

export const enum OrderActionTypes {
  SET_RX_INFORMATION = '@@order/SET_RX_INFORMATION',
  SET_RECOMMENDATION = '@@order/SET_RECOMMENDATION',
  SET_LENS = '@@order/SET_LENS',
  SET_FRAME = '@@order/SET_FRAME',
}

export interface OrderState {
  readonly prescription: {
    OD: Rx,
    OS: Rx
  };
  readonly frame: Frame;
  readonly fittingHeight: number;
  readonly lens: Lens;
  readonly recommendation: string;
  // readonly fetching: boolean;
}
