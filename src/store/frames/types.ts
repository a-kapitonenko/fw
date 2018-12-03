export type Frame = {
  upc: number;
  label: string;
  value: string; 
  img: string;
  compatibility?: boolean;
};

export const enum FramesActionTypes {
  FETCH_REQUEST = '@@frames/FETCH_REQUEST',
  CLOSE_REQUEST = '@@frames/CLOSE_REQUEST',
  SET_ERRORS = '@@frames/SET_ERRORS',
  CLEAR_ERRORS = '@@frames/CLEAR_ERRORS',
  OPEN = '@@frames/OPEN',
  CLOSE = '@@frames/CLOSE',
  SET_STEP = '@@frames/SET_STEP',
  SET_SELECTED_FRAME = '@@frames/SET_SELECTED_FRAME',
  RESET_SELECTED_FRAME = '@@frames/RESET_SELECTED_FRAME',
  SET_SIMILAR_FRAMES = '@@frames/SET_SIMILAR_FRAMES',
  RESET_SIMILAR_FRAMES = '@@frames/RESET_SIMILAR_FRAMES',
};

export interface FramesState {
  readonly isFetching: boolean;
  // readonly update: boolean;
  readonly errors?: string;
  readonly open: boolean;
  readonly step: number;
  readonly selectedFrame: Frame;
  readonly similarFrames: Frame[];
};
