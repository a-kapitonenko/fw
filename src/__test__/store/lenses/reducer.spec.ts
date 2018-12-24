import { LensesActionTypes, Lens } from '../../../store/lenses/types';
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
    const lensesPayload: Lens[] = mockData.lenses;

    const filterAction = {
      type: LensesActionTypes.FETCH_LENSES_SUCCESS,
      payload: lensesPayload,
    };
    
    expect(LensesReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles FETCH_LENSES_FAILED', () => {
    const lensesPayload: string = mockData.errorMessage;

    const filterAction = {
      type: LensesActionTypes.FETCH_LENSES_FAILED,
      payload: lensesPayload,
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
    const lensesPayload: string = mockData.errorMessage;

    const filterAction = {
      type: LensesActionTypes.SAVE_LENS_FAILED,
      payload: lensesPayload,
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
    const lensesPayload: string = mockData.errorMessage;

    const filterAction = {
      type: LensesActionTypes.CHECK_LENS_FALIED,
      payload: lensesPayload,
    };
    
    expect(LensesReducer(undefined, filterAction)).toMatchSnapshot();
  });

  it('test handles SET_INITIAL_VALUE', () => {
    const lensesPayload: Lens[] = mockData.lenses;

    const filterAction = {
      type: LensesActionTypes.SET_INITIAL_VALUE,
      payload: lensesPayload,
    };
    
    expect(LensesReducer(undefined, filterAction)).toMatchSnapshot();
  });
});
