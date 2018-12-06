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

export const enum GroupsTypes {
  COLOR = 'color',
  WIDTH = 'width',
  NOSE_BRIDGE = 'noseBridge',
  SHAPE = 'shape',
  MATERIAL = 'material',
}

export const enum FilterActionTypes {
  FILTERING_START = '@@filter/FILTERING_START',
  FILTERING_SUCCESS = '@@filter/FILTERING_SUCCESS',
  FILTERING_FAILED = '@@filter/FILTERING_FAILDE',

  FETCH_GROUPS_START = '@@filter/FETCHING_GROUPS_START',
  FETCH_GROUPS_SUCCESS = '@@filter/FETCHING_GROUPS_SUCCESS',
  FETCH_GROUPS_FAILED = '@@filter/FETCHING_GROUPS_FAILED',

  CHANGE_CHECKED = '@@filter/CHANGE_CHECKED',
  CLEAR_CHECKED = '@@filter/CLEAR_CHECKED',
  ADD_QUERY = '@@filter/ADD_QUERY',
  DELETE_QUERY = '@@filter/DELETE_QUERY',
  CLEAR_QUERY = '@@filter/CLEAR_QUERY',
}

export interface IFilterState {
  readonly isFetching: boolean;
  readonly errors: string;
  readonly query: object;
  readonly frames: Frame[];
  readonly groups: {
    readonly isFetching: boolean;
    readonly errors: string;
    readonly data: Groups;
  };
};
