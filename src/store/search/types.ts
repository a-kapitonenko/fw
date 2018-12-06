import { Frame } from '../frames/types';

export const enum SearchActionTypes {
  SEARCH_START = '@@search/SEARCH_START',
  SEARCH_SUCCESS = '@@search/SEARCH_SUCCESS',
  SEARCH_FAILED = '@@search/SEARCH_FAILED',
  SEARCH_CLEAR = '@@search/SEARCH_CLEAR',
  SET_SELECTED_FRAMES = '@@search_SET_SELECTED_FRAMES',
}

export interface ISearchState {
  readonly isFetching: boolean;
  readonly errors: string;
  readonly frames: Frame[];
  readonly selectedFrames: Frame[];
}
