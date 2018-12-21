import { FilterActionTypes } from '../../../store/filter/types';
import { FilterReducer } from '../../../store/filter/reducer';
import { Frame } from '../../../store/frames/types';
import * as mockData from '../../mockData';

describe('search reducer', () => {
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
});
