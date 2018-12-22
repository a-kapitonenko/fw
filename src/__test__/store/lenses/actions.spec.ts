import * as lensesActions from '../../../store/lenses/actions';
import { Prescription } from '../../../store/order/types';
import { Lens } from '../../../store/lenses/types';
import * as mockData from '../../mockData';

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
    expect(lensesActions.fetchLensesFailed(mockData.errorMessage)).toMatchSnapshot();
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
    expect(lensesActions.saveLensFailed(mockData.errorMessage)).toMatchSnapshot();
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
    expect(lensesActions.checkLensFailed(mockData.errorMessage)).toMatchSnapshot();
  });

  it('test setInitialValue action creator', () => {
    const lenses: Lens[] = mockData.lenses;

    expect(lensesActions.setInitialValue(lenses)).toMatchSnapshot();
  });
});
