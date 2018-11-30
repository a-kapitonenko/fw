import { Frame } from '../frames/types';

export type Field = {
  name: string;
  value: string;
  checked?: boolean;
};

export type Groups = {
  color: Field[];
  width: Field[];
  noseBridge: Field[];
  shape: Field[];
  material: Field[];
};

export const enum FilterActionTypes {
  FETCH_REQUEST = '@@filter/FETCH_REQUEST',
  FETCH_SUCCESS = '@@filter/FETCH_SUCCESS',
  FETCH_ERROR = '@@filter/FETCH_ERROR',
  CHANGE_CHECKED = '@@filter/CHANGE_CHECKED',
  RESET_CHECKED = '@@filter/RESET_CHECKED',
  ADD_QUERY = '@@filter/ADD_QUERY',
  DELETE_QUERY = '@@filter/DELETE_QUERY',
  RESET_QUERY = '@@filter/RESET_QUERY',
  SET_FRAMES = '@@filter/SET_FRAMES',
};

export interface IFilterState {
  readonly fetching: boolean;
  readonly errors: string;
  readonly groups: Groups;
  readonly query: object;
  readonly frames: Frame[];
};
