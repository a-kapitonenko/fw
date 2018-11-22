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
};

export interface IFilterState {
  readonly fetching: boolean;
  readonly groups: Groups;
  readonly errors: string;
  readonly query: Object;
  readonly frames: Frame[];
};
