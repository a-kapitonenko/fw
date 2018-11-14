import { Reducer } from 'redux';
import { LensesState, LensesActionTypes } from './types';

const initialState: LensesState = {
  fetching: false,
  list: [],
  errors: '',
}

const reducer: Reducer<LensesState> = (state = initialState, action) => {
  switch (action.type) {
    case LensesActionTypes.FETCH_REQUEST: {
      return { ...state, fetching: true };
    }
    case LensesActionTypes.FETCH_SUCCESS: {
      return { 
        ...state, 
        fetching: false, 
        list: action.payload 
      };
    }
    case LensesActionTypes.FETCH_ERROR: {
      return { 
        ...state, 
        fetching: false, 
        errors: action.payload 
      };
    }
    default: {
      return state
    }
  }
};

export { reducer as LensesReducer }
