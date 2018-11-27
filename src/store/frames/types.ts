export type Frame = {
  upc: number;
  label: string;
  value: string; 
  img: string;
  compatibility?: boolean;
};

export const enum FramesActionTypes {
  FETCH_REQUEST = '@@frames/FETCH_REQUEST',
  FETCH_SUCCESS = '@@frames/FETCH_SUCCESS',
  FETCH_ERROR = '@@frames/FETCH_ERROR',
  OPEN = '@@frames/OPEN',
  CLOSE = '@@frames/CLOSE',
  SET_STEP = '@@frames/SET_STEP',
  SET_SELECTED_FRAME = '@@frames/SET_SELECTED_FRAME',
  RESET_SELECTED_FRAME = '@@frames/RESET_SELECTED_FRAME',
};

export interface FramesState {
  readonly fetching: boolean;
  readonly errors?: string;
  readonly open: boolean;
  readonly step: number;
  readonly selectedFrame: Frame;
  readonly similarFrames: Frame[];
};
