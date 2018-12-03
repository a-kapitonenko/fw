import { Reducer } from 'redux';
import { ILensesState, LensesActionTypes } from './types';

const initialState: ILensesState = {
  // fetching: false,
  lenses: [],
  errors: '',
}

const reducer: Reducer<ILensesState> = (state = initialState, action) => {
  switch (action.type) {
    // case LensesActionTypes.FETCH_REQUEST: {
    //   return { ...state, fetching: true };
    // }
    // case LensesActionTypes.CLOSE_REQUEST: {
    //   return { ...state, fetching: false };
    // }
    case LensesActionTypes.SET_ERRORS: {
      return { ...state, errors: action.payload };
    }
    case LensesActionTypes.CLEAR_ERRORS: {
      return { ...state, errors: '' };
    }
    case LensesActionTypes.SET_LENSES: {
      return { ...state, lenses: action.payload };
    }
    default: {
      return state
    }
  }
};

export { reducer as LensesReducer }
