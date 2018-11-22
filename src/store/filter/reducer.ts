import { Reducer } from 'redux';
import { IFilterState, FilterActionTypes, Groups, Field } from './types';

const initialState: IFilterState = {
  fetching: false,
  groups: <Groups>{
    color: [],
    width: [],
    noseBridge: [],
    shape: [],
    material: []
  },
  errors: '',
  query: {},
  frames: []
};

const reducer: Reducer<IFilterState> = (state = initialState, action) => {
  switch (action.type) {
    case FilterActionTypes.FETCH_REQUEST: {
      return { ...state, fetching: true };
    }
    case FilterActionTypes.FETCH_SUCCESS: {
      return { ...state, fetching: false, groups: action.payload };
    }
    case FilterActionTypes.FETCH_ERROR: {
      return { ...state, fetching: false, errors: action.payload };
    }
    case FilterActionTypes.CHANGE_CHECKED: {
      const item = state.groups[action.payload.type].map((field: Field) => {
        if (field.name === action.payload.name) {
          return { ...field, checked: action.payload.value };
        }

        return { ...field };
      });

      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.type]: item
        }
      }
    }
    default: {
      return state
    }
  }
};

export { reducer as FilterReducer };
