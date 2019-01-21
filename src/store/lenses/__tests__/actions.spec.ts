import * as lensesActions from '../actions';
import { Prescription } from '../../order/types';
import { Lens } from '../types';
import * as mockData from '../../../mockData';

describe('lenses actions', () => {
  it('test fetchLensesStart action creator', () => {
    const prescription: Prescription = mockData.prescription;

    expect(lensesActions.fetchLensesStart(prescription)).toMatchSnapshot();
  });

  it('test fetchLensesSuccess action creator', () => {
    const lenses: Lens[] = mockData.lenses;

    expect(lensesActions.fetchLensesSuccess(lenses)).toMatchSnapshot();
  });

  it('test fetchLensesFailed action creator', () => {
    const message: string = mockData.errorMessage;

    expect(lensesActions.fetchLensesFailed(message)).toMatchSnapshot();
  });

  it('test saveLensStart action creator', () => {
    const prescription: Prescription = mockData.prescription;
    const lens: Lens = mockData.lens;

    expect(lensesActions.saveLensStart(prescription, lens)).toMatchSnapshot();
  });

  it('test saveLensSuccess action creator', () => {
    expect(lensesActions.saveLensSuccess()).toMatchSnapshot();
  });

  it('test saveLensFailed action creator', () => {
    const message: string = mockData.errorMessage;

    expect(lensesActions.saveLensFailed(message)).toMatchSnapshot();
  });

  it('test checkLensStart action creator', () => {
    const prescription: Prescription = mockData.prescription;
    const lens: Lens = mockData.lens;

    expect(lensesActions.checkLensStart(prescription, lens)).toMatchSnapshot();
  });

  it('test checkLensSuccess action creator', () => {
    expect(lensesActions.checkLensSuccess()).toMatchSnapshot();
  });

  it('test checkLensFailed action creator', () => {
    const message: string = mockData.errorMessage;

    expect(lensesActions.checkLensFailed(message)).toMatchSnapshot();
  });

  it('test setInitialValue action creator', () => {
    const lenses: Lens[] = mockData.lenses;

    expect(lensesActions.setInitialValue(lenses)).toMatchSnapshot();
  });
});
