export type OculusInfo = {
  sphere: string;
  cyclinder: string;
  axis: string;
  addition: string;
  PDDistance: string;
  PDNear: string;
  prism: string;
};

export type Rx = {
  OD: OculusInfo;
  OS: OculusInfo;
};

export interface IPrescriptionState {
  readonly isFetching: boolean;
  readonly errors: string;
  readonly rx: Rx;
  readonly fittingProperties: any;
  readonly fittingHeight: number;
}