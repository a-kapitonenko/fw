export interface Lens {
  name: string;
  value: number;
}

export const enum LensesActionTypes {
  FETCH_REQUEST = '@@lenses/FETCH_REQUEST',
  FETCH_SUCCESS = '@@lenses/FETCH_SUCCESS',
  FETCH_ERROR = '@@lenses/FETCH_ERROR',
}

export interface LensesState {
  readonly fetching: boolean;
  readonly errors?: string;
  readonly list: Lens[];
}
