import { Reducer } from 'redux';
import { IFilterState, FilterActionTypes, Groups, Field } from './types';

const initialGroupsState = {
  color: [],
  width: [],
  noseBridge: [],
  shape: [],
  material: []
}

const initialState: IFilterState = {
  fetching: false,
  groups: <Groups>initialGroupsState,
  errors: '',
  query: initialGroupsState,
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
      };
    }
    case FilterActionTypes.RESET_CHECKED: {
      const groups = <Groups>{};

      for (const group in state.groups) {
        groups[group] = state.groups[group].map((field: Field) => ({ ...field, checked: false }));
      }

      return { ...state, groups };
    }
    case FilterActionTypes.ADD_QUERY: {
      return {
        ...state,
        query: {
          ...state.query,
          [action.payload.type]: [
            ...state.query[action.payload.type],
            action.payload.value
          ]
        }
      };
    }
    case FilterActionTypes.DELETE_QUERY: {
      const index = state.query[action.payload.type].indexOf(action.payload.value);

      return {
        ...state,
        query: {
          ...state.query,
          [action.payload.type]: [
            ...state.query[action.payload.type].slice(0, index),
            ...state.query[action.payload.type].slice(index + 1)
          ]
        }
      };
    }
    case FilterActionTypes.RESET_QUERY: {
      return { ...state, query: initialGroupsState };
    }
    case FilterActionTypes.SET_FRAMES: {
      return { ...state, frames: action.payload };
    }
    default: {
      return state
    }
  }
};

export { reducer as FilterReducer };
