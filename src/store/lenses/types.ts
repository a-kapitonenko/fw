export type Lens = {
  name: string;
  value: number;
};

export const enum LensesActionTypes {
  FETCH_REQUEST = '@@lenses/FETCH_REQUEST',
  FETCH_SUCCESS = '@@lenses/FETCH_SUCCESS',
  FETCH_ERROR = '@@lenses/FETCH_ERROR',
  SET_ERROR = '@@lenses/SET_ERROR',
  RESET_ERROR = '@@lenses/RESET_ERROR',
};

export interface ILensesState {
  readonly fetching: boolean;
  readonly errors: string;
  readonly lenses: Lens[];
};
