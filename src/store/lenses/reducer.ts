import { Reducer } from 'redux';
import { ILensesState, LensesActionTypes } from './types';
import { saveStart, saveSuccess, saveFailed } from '../index';

const initialState: ILensesState = {
  isFetching: false,
  errors: '',
  lenses: [],
};

const reducer: Reducer<ILensesState> = (state = initialState, action) => {
  switch (action.type) {
    case LensesActionTypes.FETCH_LENSES_START: {
      return saveStart(state);
    }
    case LensesActionTypes.FETCH_LENSES_SUCCESS: {
      return saveSuccess(state, 'lenses', action.payload);
    }
    case LensesActionTypes.FETCH_LENSES_FAILED: {
      return saveFailed(state, action.payload);
    }
    case LensesActionTypes.SAVE_LENS_START: {
      return saveStart(state);
    }
    case LensesActionTypes.SAVE_LENS_SUCCESS: {
      return saveSuccess(state);
    }
    case LensesActionTypes.SAVE_LENS_FAILED: {
      return saveFailed(state, action.payload);
    }
    case LensesActionTypes.CHECK_LENS_START: {
      return saveStart(state);
    }
    case LensesActionTypes.CHECK_LENS_SUCCESS: {
      return saveSuccess(state);
    }
    case LensesActionTypes.CHECK_LENS_FALIED: {
      return saveFailed(state, action.payload);
    }
    case LensesActionTypes.SET_INITIAL_VALUE: {
      return {
        ...state,
        lenses: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as LensesReducer };
