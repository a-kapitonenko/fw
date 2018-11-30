import { Reducer } from 'redux';
import { ILensesState, LensesActionTypes } from './types';

const initialState: ILensesState = {
  fetching: false,
  lenses: [],
  errors: '',
}

const reducer: Reducer<ILensesState> = (state = initialState, action) => {
  switch (action.type) {
    case LensesActionTypes.FETCH_REQUEST: {
      return { ...state, fetching: true };
    }
    case LensesActionTypes.FETCH_SUCCESS: {
      return { ...state, fetching: false, lenses: action.payload };
    }
    case LensesActionTypes.FETCH_ERROR: {
      return { ...state, fetching: false, errors: action.payload };
    }
    case LensesActionTypes.SET_ERROR: {
      return { ...state, errors: action.payload };
    }
    case LensesActionTypes.RESET_ERROR: {
      return { ...state, errors: '' };
    }
    default: {
      return state
    }
  }
};

export { reducer as LensesReducer }
