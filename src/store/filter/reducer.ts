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
  isFetching: false,
  errors: '',
  query: initialGroupsState,
  frames: [],
  groups: {
    isFetching: false,
    errors: '',
    data: <Groups>initialGroupsState,
  }
};

const reducer: Reducer<IFilterState> = (state = initialState, action) => {
  switch (action.type) {
    case FilterActionTypes.FILTERING_START: {
      return { ...state, isFetching: true, errors: '' };
    }
    case FilterActionTypes.FILTERING_SUCCESS: {
      return { ...state, isFetching: false, frames: action.payload };
    }
    case FilterActionTypes.FILTERING_FAILED: {
      return { ...state, isFetching: false, errors: action.payload };
    }
    case FilterActionTypes.FETCH_GROUPS_START: {
      return { ...state, groups: { ...state.groups, isFetching: true, errors: '' } };
    }
    case FilterActionTypes.FETCH_GROUPS_SUCCESS: {
      return { ...state, groups: { ...state.groups, isFetching: false, data: action.payload } };
    }
    case FilterActionTypes.FETCH_GROUPS_FAILED: {
      return { ...state, groups: { ...state.groups, isFetching: true, errors: action.paylaod } };
    }
    case FilterActionTypes.CHANGE_CHECKED: {
      const item = state.groups.data[action.payload.type].map((field: Field) => {
        if (field.name === action.payload.name) {
          return { ...field, checked: action.payload.value };
        }

        return { ...field };
      });

      return {
        ...state,
        groups: {
          ...state.groups,
          data: {
            ...state.groups.data,
            [action.payload.type]: item
          }
        }
      };
    }
    case FilterActionTypes.CLEAR_CHECKED: {
      const groups = <Groups>{};

      for (const group in state.groups.data) {
        groups[group] = state.groups.data[group].map((field: Field) => ({ ...field, checked: false }));
      }

      return { ...state, groups: { ...state.groups, data: groups } };
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
    case FilterActionTypes.CLEAR_QUERY: {
      return { ...state, query: initialGroupsState };
    }
    default: {
      return state;
    }
  }
};

export { reducer as FilterReducer };
