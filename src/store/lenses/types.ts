export type Lens = {
  name: string;
  value: number;
};

export const enum LensesActionTypes {
  FETCH_LENSES_START = '@@lenses/FETCH_LENSES_START',
  FETCH_LENSES_SUCCESS = '@@lenses/FETCH_LENSES_SUCCESS',
  FETCH_LENSES_FAILED = '@@lenses/FETCH_LENSES_FAILED',

  SAVE_LENS_START = '@@lenses/SAVE_LENS_START',
  SAVE_LENS_SUCCESS = '@@lenses/SAVE_LENS_SUCCESS',
  SAVE_LENS_FAILED = '@@lenses/SAVE_LENS_FAILED',

  CHECK_LENS_START = '@@lenses/CHECK_LENS_START',
  CHECK_LENS_SUCCESS = '@@lenses/CHECK_LENS_SUCCESS',
  CHECK_LENS_FALIED = '@@lenses/CHECK_LENS_FAILED',
};

export interface ILensesState {
  readonly isFetching: boolean;
  readonly errors: string;
  readonly lenses: Lens[];
};
