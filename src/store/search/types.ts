import { Frame } from '../frames/types';

export const enum SearchActionTypes {
  FETCH_REQUEST = '@@search/FETCH_REQUEST',
  CLOSE_REQUEST = '@@search/CLOSE_REQUEST',
  SET_ERRORS = '@@search/SET_ERRORS',
  CLEAR_ERRORS = '@@search/CLEAR_ERRORS',
  FETCH_FRAMES = '@@search/FETCH_FRAMES',
  SET_FRAMES = '@@search/SET_FRAMES',
  SET_SELECTED_FRAMES = '@@search/SET_SELECTED_FRAMES',
}

export interface ISearchState {
  readonly isFetching: boolean;
  readonly errors: string;
  readonly frames: Frame[];
  readonly selectedFrames: Frame[];
}
