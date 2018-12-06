export type Frame = {
  upc: number;
  label: string;
  value: string; 
  img: string;
  compatibility?: boolean;
};

export const enum FramesActionTypes {
  FETCH_SIMILAR_FRAMES_START = '@@frames/FETCH_SIMILAR_FRAMES_START',
  FETCH_SIMILAR_FRAMES_SUCCESS = '@@frames/FETCH_SIMILAR_FRAMES_SUCCESS',
  FETCH_SIMILAR_FRAMES_FAILED = '@@frames/FETCH_SIMILAR_FRAMES_FAILED',
  
  SUBMIT_START = '@@frames/SUBMIT_START',
  SUBMIT_SUCCESS = '@@frames/SUBMIT_SUCCESS',
  SUBMIT_FAILED = '@@frames/SUBMIT_FAILED',

  OPEN = '@@frames/OPEN',
  CLOSE = '@@frames/CLOSE',

  SET_SELECTED_FRAME = '@@frames/SET_SELECTED_FRAME',
  CLEAR_SELECTED_FRAME = '@@frame/CLEAR_SELECTED_FRAME',
};

export interface FramesState {
  readonly isFetching: boolean;
  readonly errors: string;
  readonly open: boolean;
  readonly selectedFrame: Frame;
  readonly similarFrames: {
    readonly isFetching: boolean;
    readonly errors: string;
    readonly data: Frame[];
  };
};
