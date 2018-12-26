import { Prescription } from '../../store/order/types';
import { isPrescriptionFilled } from '../orderSelectionHelper';
import * as mockData from '../../mockData';

describe('mathHelper', () => {
  const filledPrescription: Prescription = mockData.prescription;
  const emptyPrescription: Prescription = {} as Prescription;

  it('should return true for filled prescription', () => {
    expect(isPrescriptionFilled(filledPrescription)).toEqual(true);
  });

  it('should return false for empty prescription', () => {
    expect(isPrescriptionFilled(emptyPrescription)).toEqual(false);
  });
});
