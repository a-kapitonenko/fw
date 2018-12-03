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
  FETCH_REQUEST = '@@filter/FETCH_REQUEST',
  CLOSE_REQUEST = '@@filter/CLOSE_REQUEST',
  SET_ERRORS = '@@filter/SET_ERRORS',
  CLEAR_ERRORS = '@@filter/CLEAR_ERRORS',
  SET_GROUPS = '@@filter/SET_GROUPS',
  SET_FRAMES = '@@filter/SET_FRAMES',
  CHANGE_CHECKED = '@@filter/CHANGE_CHECKED',
  RESET_CHECKED = '@@filter/RESET_CHECKED',
  ADD_QUERY = '@@filter/ADD_QUERY',
  DELETE_QUERY = '@@filter/DELETE_QUERY',
  CLEAR_QUERY = '@@filter/CLEAR_QUERY',
}

export interface IFilterState {
  readonly isFetching: boolean;
  readonly errors: string;
  readonly groups: Groups;
  readonly query: object;
  readonly frames: Frame[];
};
