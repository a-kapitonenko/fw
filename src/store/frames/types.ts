export interface Frame {
  upc: number;
  name: string;
  img: string;
}

export interface SelectedFrame extends Frame {
  compatibility: boolean;
}

export const enum FramesActionTypes {
  FETCH_REQUEST = '@@frames/FETCH_REQUEST',
  FETCH_SUCCESS = '@@frames/FETCH_SUCCESS',
  FETCH_ERROR = '@@frames/FETCH_ERROR',
  ADD_SELECTED = '@@frames/ADD_SELECTED',
  SET_SELECTED = '@@frames/SET_SELECTED',
  DELETE_SELECTED = '@@frames/DELETE_SELECTED',
}

export interface FramesState {
  readonly fetching: boolean;
  readonly list: Frame[];
  readonly selected: SelectedFrame[];
  readonly errors?: string;
}
