import { OrderActionTypes, Blueprint, BossTypes } from '../../../store/order/types';
import { OrderReducer } from '../../../store/order/reducer';
import * as mockData from '../../mockData';

describe('order reducer', () => {
  it('test handles SUBMIT_START', () => {
    const orderAction = {
      type: OrderActionTypes.SUBMIT_START,
      payload: {},
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SUBMIT_SUCCESS', () => {
    const orderAction = {
      type: OrderActionTypes.SUBMIT_SUCCESS,
      payload: {},
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SUBMIT_FAILED', () => {
    const orderPayload: string = mockData.errorMessage;

    const orderAction = {
      type: OrderActionTypes.SUBMIT_FAILED,
      payload: orderPayload,
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SAVE_ORDER_START', () => {
    const orderAction = {
      type: OrderActionTypes.SAVE_ORDER_START,
      payload: {},
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SAVE_ORDER_SUCCESS', () => {
    const orderAction = {
      type: OrderActionTypes.SAVE_ORDER_SUCCESS,
      payload: {},
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SAVE_ORDER_FAILED', () => {
    const orderPayload: string = mockData.errorMessage;

    const orderAction = {
      type: OrderActionTypes.SAVE_ORDER_FAILED,
      payload: orderPayload,
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles FETCH_ORDER_VALUES_START', () => {
    const orderAction = {
      type: OrderActionTypes.FETCH_ORDER_VALUES_START,
      payload: {},
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles FETCH_ORDER_VALUES_SUCCESS', () => {
    const orderPayload: any = mockData.values;

    const orderAction = {
      type: OrderActionTypes.FETCH_ORDER_VALUES_SUCCESS,
      payload: orderPayload,
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles FETCH_ORDER_VALUES_FAILED', () => {
    const orderPayload: string = mockData.errorMessage;

    const orderAction = {
      type: OrderActionTypes.FETCH_ORDER_VALUES_FAILED,
      payload: orderPayload,
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SAVE_PRESCRIPTION_START', () => {
    const orderAction = {
      type: OrderActionTypes.SAVE_PRESCRIPTION_START,
      payload: {},
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SAVE_PRESCRIPTION_SUCCESS', () => {
    const orderAction = {
      type: OrderActionTypes.SAVE_PRESCRIPTION_SUCCESS,
      payload: {},
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SAVE_PRESCRIPTION_FAILED', () => {
    const orderPayload: string = mockData.errorMessage;

    const orderAction = {
      type: OrderActionTypes.SAVE_PRESCRIPTION_FAILED,
      payload: orderPayload,
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SAVE_FITTING_HEIGHT_START', () => {
    const orderAction = {
      type: OrderActionTypes.SAVE_FITTING_HEIGHT_START,
      payload: {},
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SAVE_FITTING_HEIGHT_SUCCESS', () => {
    const orderPayload: Blueprint = mockData.blueprint;

    const orderAction = {
      type: OrderActionTypes.SAVE_FITTING_HEIGHT_SUCCESS,
      payload: orderPayload,
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SAVE_FITTING_HEIGHT_FAILED', () => {
    const orderPayload: string = mockData.errorMessage;

    const orderAction = {
      type: OrderActionTypes.SAVE_FITTING_HEIGHT_FAILED,
      payload: orderPayload,
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SET_RX_INFORMATION', () => {
    const orderPayload: { type: string, field: string, value: string } = {
      type: 'OD',
      field: 'sphere',
      value: '-7.5',
    };

    const orderAction = {
      type: OrderActionTypes.SET_RX_INFORMATION,
      payload: orderPayload,
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SET_RECOMMENDATION', () => {
    const orderPayload: string = mockData.recommendation;

    const orderAction = {
      type: OrderActionTypes.SET_RECOMMENDATION,
      payload: orderPayload,
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SET_MESSAGE', () => {
    const orderPayload: string = mockData.message;

    const orderAction = {
      type: OrderActionTypes.SET_MESSAGE,
      payload: orderPayload,
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SET_FITTING_PROPERTIES', () => {
    const orderPayload: any = mockData.fittingHeight;

    const orderAction = {
      type: OrderActionTypes.SET_FITTING_PROPERTIES,
      payload: orderPayload,
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test handles SET_BOSS', () => {
    const orderPayload: { type: BossTypes, value: any } = {
      type: BossTypes.LENS,
      value: mockData.lens,
    };
    
    const orderAction = {
      type: OrderActionTypes.SET_BOSS,
      payload: orderPayload,
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });

  it('test DISABLE_REDIRECT SET_BOSS', () => {
    const orderAction = {
      type: OrderActionTypes.DISABLE_REDIRECT,
      payload: {},
    };
    
    expect(OrderReducer(undefined, orderAction)).toMatchSnapshot();
  });
});
