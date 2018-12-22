import { FilterActionTypes } from '../../../store/filter/types';
import { FilterReducer } from '../../../store/filter/reducer';
import * as mockData from '../../mockData';

describe('filter reducer', () => {
  it('test handles FILTERING_START', () => {
    const filterAction = {
      type: FilterActionTypes.FILTERING_START,
      payload: {},
    };
    
    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles FILTERING_SUCCESS', () => {
    const filterAction = {
      type: FilterActionTypes.FILTERING_SUCCESS,
      payload: mockData.frames,
    };
    
    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles FILTERING_FAILED', () => {
    const filterAction = {
      type: FilterActionTypes.FILTERING_FAILED,
      payload: mockData.errorMessage,
    };

    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles FETCH_GROUPS_START', () => {
    const filterAction = {
      type: FilterActionTypes.FETCH_GROUPS_START,
      payload: {},
    };
    
    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles FETCH_GROUPS_SUCCESS', () => {
    const filterAction = {
      type: FilterActionTypes.FETCH_GROUPS_SUCCESS,
      payload: mockData.groups,
    };
    
    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles FETCH_GROUPS_FAILED', () => {
    const filterAction = {
      type: FilterActionTypes.FETCH_GROUPS_FAILED,
      payload: mockData.errorMessage,
    };

    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles CHANGE_CHECKED', () => {
    const filterPayload = {
      type: 'color',
      name: 'Black',
      value: true,
    };

    const filterAction = {
      type: FilterActionTypes.CHANGE_CHECKED,
      payload: filterPayload,
    };

    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles CLEAR_CHECKED', () => {
    const filterAction = {
      type: FilterActionTypes.CLEAR_CHECKED,
      payload: {},
    };
    
    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles ADD_QUERY', () => {
    const filterPayload = {
      type: 'color',
      value: 'test',
    };

    const filterAction = {
      type: FilterActionTypes.ADD_QUERY,
      payload: filterPayload,
    };

    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles DELETE_QUERY', () => {
    const filterPayload = {
      type: 'color',
      value: 'test',
    };

    const filterAction = {
      type: FilterActionTypes.DELETE_QUERY,
      payload: filterPayload,
    };

    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles CLEAR_QUERY', () => {
    const filterAction = {
      type: FilterActionTypes.CLEAR_QUERY,
      payload: {},
    };
    
    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles CLEAR_RESULT', () => {
    const filterAction = {
      type: FilterActionTypes.CLEAR_RESULT,
      payload: {},
    };
    
    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });
});
