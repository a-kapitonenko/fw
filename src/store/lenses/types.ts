export type Lens = {
  name: string;
  value: number;
};

export const enum LensesActionTypes {
  // FETCH_REQUEST = '@@lenses/FETCH_REQUEST',
  // CLOES_REQUEST = '@@lenses/CLOES_REQUEST',
  SET_ERRORS = '@@lenses/SET_ERRORS',
  CLEAR_ERRORS = '@@lenses/CLEAR_ERRORS',
  SET_LENSES = '@@lenses/SET_LENSES',
};

export interface ILensesState {
  // readonly fetching: boolean;
  readonly errors?: string;
  readonly lenses: Lens[];
};
