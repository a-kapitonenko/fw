export interface Frame {
  upc: number;
  name: string;
  img: string;
}

export interface SelectedFrames extends Frame {
  compatibility: boolean;
}

export const enum FramesActionTypes {
  FETCH_REQUEST = '@@frames/FETCH_REQUEST',
  FETCH_SUCCESS = '@@frames/FETCH_SUCCESS',
  FETCH_ERROR = '@@frames/FETCH_ERROR',
  ADD_TO_SELECT = '@@frames/ADD_TO_SELECT',
}

export interface FramesState {
  readonly fetching: boolean;
  readonly list: Frame[];
  readonly selected: SelectedFrames[];
  readonly errors?: string;
}
