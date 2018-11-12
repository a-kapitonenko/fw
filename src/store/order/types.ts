import { Frame } from '../frames/types';
import { Lens } from '../lenses/types';

export interface Rx {
  sphere: number,
  cyclinder: number,
  axis: number,
  addition: number,
  PDDistance: number,
  PDNear: number,
  prism: number
}

export const enum OrderActionTypes {
  SET_RECOMMENDATION = '@@order/SET_RECOMMENDATION',
  SET_RX_INFORMATION = '@@order/SET_RX_INFORMATION',
  SET_LENS = '@@order/SET_LENS',
  SET_FRAME = '@@order/SET_FRAME',
}

export interface OrderState {
  readonly prescription: {
    OD: Rx,
    OS: Rx
  };
  readonly frame: Frame;
  readonly fittingHeight: number,
  readonly lens: Lens,
  readonly recommendation: string,
}
