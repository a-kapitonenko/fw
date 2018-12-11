import { Frame } from '../frames/types';

export const enum SearchActionTypes {
  SEARCH_START = '@@search/SEARCH_START',
  SEARCH_SUCCESS = '@@search/SEARCH_SUCCESS',
  SEARCH_FAILED = '@@search/SEARCH_FAILED',
  SET_SELECTED_FRAMES = '@@search/SET_SELECTED_FRAMES',
  CLEAR_RESULT = '@@search/CLEAR_RESULT',
}

export interface ISearchState {
  readonly isFetching: boolean;
  readonly errors: string;
  readonly frames: Frame[];
  readonly selectedFrames: Frame[];
}
