export type Frame = {
  upc: number;
  name: string;
  img: string;
}

export type UPCSearch = {
  fetching: boolean;
  list: Frame[];
  errors: string;
  selectedFrames: Frame[];
  selectedFrame: Frame;
}

export interface SelectedFrame extends Frame {
  compatibility: boolean;
}

export const enum FramesActionTypes {
  OPEN = '@@frames/OPEN',
  CLOSE = '@@frames/CLOSE',
  FETCH_REQUEST = '@@frames/FETCH_REQUEST',
  FETCH_SUCCESS = '@@frames/FETCH_SUCCESS',
  FETCH_ERROR = '@@frames/FETCH_ERROR',
  ADD_SELECTED = '@@frames/ADD_SELECTED',
  SET_SELECTED = '@@frames/SET_SELECTED',
  DELETE_SELECTED = '@@frames/DELETE_SELECTED',
  SET_SELECTED_FRAME = '@@frames/SET_SELECTED_FRAME',
  SET_SIMILAR_FRAMES = '@@frmaes/SET_SIMILAR_FRAMES',

  FETCH_UPC = '@@frames/FETCH_UPC',
  FETCH_UPC_ERROR = '@@frames/FETCH_UPC_ERROR',
  FETCH_UPC_SUCCESS = '@@frames/FETCH_UPC_SUCCESS',
  SET_UPC_SELECTED = '@@frames/SET_UPC_SELECTED',
  SET_UPC_SELECTED_FRAME = '@@frames/SET_UPC_SELECTED_FRAME',
}

export interface FramesState {
  readonly open: boolean;
  readonly fetching: boolean;
  readonly errors?: string;
  readonly list: Frame[];
  readonly selected: SelectedFrame[];
  readonly selectedFrame: Frame;
  readonly similarFrames: Frame[];
  readonly UPCSearch: UPCSearch;
}
