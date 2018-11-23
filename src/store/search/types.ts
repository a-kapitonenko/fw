import { Frame } from '../frames/types';

export const enum SearchActionTypes {
  FETCH_REQUEST = '@@search/FETCH_REQUEST',
  FETCH_SUCCESS = '@@search/FETCH_SUCCESS',
  FETCH_ERROR = '@@search/FETCH_ERROR',
  SET_SELECTED_FRAMES = '@@search/SET_SELECTED_FRAMES',
}

export interface ISearchState {
  readonly fetching: boolean;
  readonly errors: string;
  readonly frames: Frame[];
  readonly selectedFrames: Frame[];
}
