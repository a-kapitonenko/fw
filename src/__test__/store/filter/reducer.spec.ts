import { FilterActionTypes, Groups } from '../../../store/filter/types';
import { Frame } from '../../../store/frames/types';
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
    const filterPayload: Frame[] = mockData.frames;

    const filterAction = {
      type: FilterActionTypes.FILTERING_SUCCESS,
      payload: filterPayload,
    };
    
    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles FILTERING_FAILED', () => {
    const filterPayload: string = mockData.errorMessage;

    const filterAction = {
      type: FilterActionTypes.FILTERING_FAILED,
      payload: filterPayload,
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
    const filterPayload: Groups = mockData.groups;

    const filterAction = {
      type: FilterActionTypes.FETCH_GROUPS_SUCCESS,
      payload: filterPayload,
    };
    
    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles FETCH_GROUPS_FAILED', () => {
    const filterPayload: string = mockData.errorMessage;

    const filterAction = {
      type: FilterActionTypes.FETCH_GROUPS_FAILED,
      payload: filterPayload,
    };

    expect(FilterReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles CHANGE_CHECKED', () => {
    const filterPayload: { type: string, name: string, value: boolean } = {
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
    const filterPayload: { type: string, value: string } = {
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
    const filterPayload: { type: string, value: string } = {
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
