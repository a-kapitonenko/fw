import { Prescription } from '../store/order/types';

export function isPrescriptionFilled(prescription: Prescription): boolean {
  for (const a in prescription) {
    for (const b in prescription[a]) {
      if (prescription[a][b].length === 0) {
        return false;
      }
    }
  }

  return true;
};
