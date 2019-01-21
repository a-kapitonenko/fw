import { ApplicationState } from '../../index';
import { Boss, Prescription, Blueprint, BossTypes } from '../types';
import * as orderActions from '../actions';
import * as mockData from '../../../mockData';

describe('order actions', () => {
  it('test submitStart action creator', () => {
    const boss: Boss = mockData.boss;

    expect(orderActions.submitStart(boss)).toMatchSnapshot();
  });

  it('test submitSuccess action creator', () => {
    expect(orderActions.submitSuccess()).toMatchSnapshot();
  });

  it('test submitFailed action creator', () => {
    const message: string = mockData.errorMessage;

    expect(orderActions.submitFailed(message)).toMatchSnapshot();
  });

  it('test saveOrderStart action creator', () => {
    const state: ApplicationState = mockData.state;

    expect(orderActions.saveOrderStart(state)).toMatchSnapshot();
  });

  it('test saveOrderSuccess action creator', () => {
    expect(orderActions.saveOrderSuccess()).toMatchSnapshot();
  });

  it('test saveOrderFailed action creator', () => {
    const message: string = mockData.errorMessage;

    expect(orderActions.saveOrderFailed(message)).toMatchSnapshot();
  });

  it('test fetchOrderValuesStart action creator', () => {
    const id: string = mockData.id;
    
    expect(orderActions.fetchOrderValuesStart(id)).toMatchSnapshot();
  });

  it('test fetchOrderValuesSuccess action creator', () => {
    const values: string = mockData.values;
    
    expect(orderActions.fetchOrderValuesSuccess(values)).toMatchSnapshot();
  });

  it('test fetchOrderValuesFailed action creator', () => {
    const message: string = mockData.errorMessage;

    expect(orderActions.fetchOrderValuesFailed(message)).toMatchSnapshot();
  });

  it('test savePrescriptionStart action creator', () => {
    const prescription: Prescription = mockData.prescription;
    
    expect(orderActions.savePrescriptionStart(prescription)).toMatchSnapshot();
  });

  it('test savePrescriptionSuccess action creator', () => {
    expect(orderActions.savePrescriptionSuccess()).toMatchSnapshot();
  });

  it('test savePrescriptionFailed action creator', () => {
    const message: string = mockData.errorMessage;

    expect(orderActions.savePrescriptionFailed(message)).toMatchSnapshot();
  });

  it('test saveFittingHeightStart action creator', () => {
    const boss: Boss = mockData.boss;
    const height: number = mockData.height;
    
    expect(orderActions.saveFittingHeightStart(boss, height)).toMatchSnapshot();
  });

  it('test saveFittingHeightSuccess action creator', () => {
    const blueprint: Blueprint = mockData.blueprint;

    expect(orderActions.saveFittingHeightSuccess(blueprint)).toMatchSnapshot();
  });

  it('test saveFittingHeightFailed action creator', () => {
    const message: string = mockData.errorMessage;

    expect(orderActions.saveFittingHeightFailed(message)).toMatchSnapshot();
  });

  it('test setRxInformation action creator', () => {
    const type: string = 'OD';
    const field: string = 'sphere';
    const value: string = '-7.5';

    expect(orderActions.setRxInformation(type, field, value)).toMatchSnapshot();
  });

  it('test setRecommendation action creator', () => {
    const recommendation: string = mockData.recommendation;

    expect(orderActions.setRecommendation(recommendation)).toMatchSnapshot();
  });

  it('test setMessage action creator', () => {
    const message: string = mockData.message;

    expect(orderActions.setMessage(message)).toMatchSnapshot();
  });

  it('test setFittingProperties action creator', () => {
    const properties: any = mockData.fittingHeight;

    expect(orderActions.setFittingProperties(properties)).toMatchSnapshot();
  });

  it('test setBoss action creator', () => {
    const type: BossTypes = BossTypes.LENS;
    const value: any = mockData.lens;

    expect(orderActions.setBoss(type, value)).toMatchSnapshot();
  });

  it('test disableRedirect action creator', () => {
    expect(orderActions.disableRedirect()).toMatchSnapshot();
  });
});
