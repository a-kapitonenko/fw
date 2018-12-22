import { LensesActionTypes } from '../../../store/lenses/types';
import { LensesReducer } from '../../../store/lenses/reducer';
import * as mockData from '../../mockData';

describe('lenses reducer', () => {
  it('test handles FETCH_LENSES_START', () => {
    const filterAction = {
      type: LensesActionTypes.FETCH_LENSES_START,
      payload: {},
    };
    
    expect(LensesReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles FETCH_LENSES_SUCCESS', () => {
    const filterAction = {
      type: LensesActionTypes.FETCH_LENSES_SUCCESS,
      payload: mockData.lenses,
    };
    
    expect(LensesReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles FETCH_LENSES_FAILED', () => {
    const filterAction = {
      type: LensesActionTypes.FETCH_LENSES_FAILED,
      payload: mockData.errorMessage,
    };
    
    expect(LensesReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles SAVE_LENS_START', () => {
    const filterAction = {
      type: LensesActionTypes.SAVE_LENS_START,
      payload: {},
    };
    
    expect(LensesReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles SAVE_LENS_SUCCESS', () => {
    const filterAction = {
      type: LensesActionTypes.SAVE_LENS_SUCCESS,
      payload: {},
    };
    
    expect(LensesReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles SAVE_LENS_FAILED', () => {
    const filterAction = {
      type: LensesActionTypes.SAVE_LENS_FAILED,
      payload: mockData.errorMessage,
    };
    
    expect(LensesReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles CHECK_LENS_START', () => {
    const filterAction = {
      type: LensesActionTypes.CHECK_LENS_START,
      payload: {},
    };
    
    expect(LensesReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles CHECK_LENS_SUCCESS', () => {
    const filterAction = {
      type: LensesActionTypes.CHECK_LENS_SUCCESS,
      payload: {},
    };
    
    expect(LensesReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles CHECK_LENS_FALIED', () => {
    const filterAction = {
      type: LensesActionTypes.CHECK_LENS_FALIED,
      payload: mockData.errorMessage,
    };
    
    expect(LensesReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles SET_INITIAL_VALUE', () => {
    const filterAction = {
      type: LensesActionTypes.SET_INITIAL_VALUE,
      payload: mockData.lenses,
    };
    
    expect(LensesReducer(undefined, filterAction)).toMatchSnapshot();
  });
});
