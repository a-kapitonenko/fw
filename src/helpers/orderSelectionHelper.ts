import { ApplicationState } from '../store';
import { Prescription } from '../store/order/types';
import { isEmptyObject } from './mathHelper';

export function isPrescriptionFilled(prescription: Prescription): boolean {
  const isEmptyPrescription = isEmptyObject(prescription);

  if (isEmptyPrescription) {
    return false;
  }

  for (const a in prescription) {
    for (const b in prescription[a]) {
      if (prescription[a][b].length === 0) {
        return false;
      }
    }
  }

  return true;
};

export function createRequestData(state: ApplicationState) {
  return {
    prescription: state.order.boss.prescription,
    recommendation: state.order.recommendation,
    message: state.order.message,
    lenses: state.lenses.lenses,
    selectedLens: state.order.boss.lens,
    selectedFrame: state.order.boss.frame,
    blueprint: state.order.blueprint,
  };
}